FROM php:8.2-apache

# Install supervisord
RUN apt-get update && apt-get install -y supervisor

# Set working directory
WORKDIR /var/www/html

# Copy the application files to the container
COPY . /var/www/html

# Enable Apache mod_rewrite for URL rewrites
RUN a2enmod rewrite

# Change the ownership of the application files
RUN chown -R www-data:www-data /var/www/html

# Copy the supervisord configuration file into the container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD [ "php", "-S", "0.0.0.0:8000" ]


# Expose port 80
EXPOSE 8080

# Start supervisord
# CMD ["/usr/bin/supervisord"]
