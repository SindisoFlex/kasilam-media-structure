import { render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import { Toaster } from "./ui/toaster";

describe("ContactForm", () => {
  it("renders the form", () => {
    render(
      <>
        <ContactForm />
        <Toaster />
      </>
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Business Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Service Needed")).toBeInTheDocument();
    expect(screen.getByLabelText("Estimated Budget Range")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
