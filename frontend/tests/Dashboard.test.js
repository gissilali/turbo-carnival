import Dashboard from "../static/js/components/Dashboard";
import { jest } from "@jest/globals";

describe("Dashboard", () => {
  let dashboard;

  beforeEach(() => {
    dashboard = new Dashboard();
    dashboard.fetchUsers = jest.fn().mockResolvedValue([
      {
        name: "Test User",
        email: "testuser@example.com",
        ip_address: "192.0.2.0",
        user_agent: "Mozilla/5.0",
        entrance_time: "2024-01-25T21:49:30Z",
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("just works", () => {
    expect(1 + 1).toBe(2);
  });

  it("fetches users from the API", async () => {
    const users = await dashboard.fetchUsers();
    expect(users).toHaveLength(1);
    expect(users[0].name).toEqual("Test User");
  });

  it("renders the view correctly", async () => {
    const view = await dashboard.renderView();
    expect(view).toContain("Test User");
    expect(view).toContain("testuser@example.com");
    expect(view).toContain("192.0.2.0");
    expect(view).toContain("2024-01-25T21:49:30Z");
  });

  it("renders the error message correctly", async () => {
    dashboard.fetchUsers = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch users."));
    const view = await dashboard.renderView();
    expect(view).toContain("Error");
    expect(view).toContain("Failed to fetch users.");
  });
});
