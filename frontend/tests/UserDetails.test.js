import UserDetails from "../static/js/components/UserDetails";
import { jest } from "@jest/globals";
describe("UserDetails", () => {
  let userDetailsComponent;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error if props is not defined", () => {
    expect(() => {
      new UserDetails();
    }).toThrow("Props or props.email is not defined");
  });

  it("throws an error if props.email is not defined", () => {
    expect(() => {
      new UserDetails({});
    }).toThrow("Props or props.email is not defined");
  });

  it("does not throw an error if props.email is defined", () => {
    expect(() => {
      new UserDetails({ email: "test@example.com" });
    }).not.toThrow();
  });

  it("renders the view correctly", async () => {
    userDetailsComponent = new UserDetails({ email: "testuser@example.com" });
    userDetailsComponent.fetchUser = jest.fn().mockResolvedValue({
      name: "Test User",
      email: "testuser@example.com",
      ip_address: "192.0.2.0",
      user_agent: "Mozilla/5.0",
      entrance_time: "2024-01-25T21:49:30Z",
      visit_count: "12560",
    });
    const view = await userDetailsComponent.renderView();
    expect(view).toContain("Test User");
    expect(view).toContain("testuser@example.com");
    expect(view).toContain("12560");
  });
});
