<?php

namespace App\Database;

class TextDatabase implements DatabaseInterface
{
    public function fetchAll(): array
    {
        $file = getenv("DATABASE");

        if (!file_exists($file)) {
            return [];
        }

        if (!is_readable($file)) {
            return [];
        }

        $handle = fopen($file, 'r');

        $data = [];

        while (($line = fgetcsv($handle)) !== FALSE) {
            $data[] = $line;
        }

        fclose($handle);



        return $this->transformData($data);
    }

    public function createOrUpdate($data): array
    {
        $file = getenv("DATABASE");
        $existingData = $this->fetchAll();

        $updatedData = $this->addIfNotExists(newRow: $data, existingData: $existingData);

        $handle = fopen($file, 'w');

        if (is_writable($file)) {
            if (filesize($file) == 0) {
                fputcsv($handle, array_keys($updatedData[0]));
            }

            foreach ($updatedData as $row) {
                fputcsv($handle, $row);
            }
        } else {
            throw new FileNotWritableException("Failed to write in '$file'");
        }

        fclose($handle);
        return $this->fetchAll();
    }

    private function transformData(array $data): array
    {
        $keys = array_shift($data);
        return array_map(function ($row) use ($keys) {
            return array_combine($keys, $row);
        }, $data);
    }

    private function addIfNotExists(array $newRow, array $existingData): array
    {
        if (!$this->userExists($existingData, $newRow['email'])) {
            array_push($existingData, $newRow);
            return $existingData;
        }

        return $existingData;
    }

    private function userExists(array $existingData, string $email): bool
    {
        $emails = array_column($existingData, 'email');
        return in_array($email, $emails);

    }
}