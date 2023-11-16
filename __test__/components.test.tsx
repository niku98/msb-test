import { render, screen } from "@testing-library/react";
import { from, map } from "rxjs";
import { describe, expect, it } from "vitest";
import { LoadingProvider } from "../src/modules/core/loading";

describe("Test components", async () => {
  it("Button", () => {
    render(<AppButton>Test button</AppButton>);
    expect(screen.getByText("Test button")).toBeInTheDocument();
  });

  it("Card", () => {
    render(<AppCard>Test card</AppCard>);
    expect(screen.getByText("Test card")).toBeInTheDocument();
  });

  it("CardTable", () => {
    render(
      <AppCardTable tableProps={{ dataSource: [] }}>
        <AppTable.Column title="Test table" dataIndex="test" />
      </AppCardTable>
    );
    expect(screen.getByText("Test table")).toBeInTheDocument();
  });

  it("Checkbox Popover", () => {
    render(
      <AppCheckboxPopover options={[{ label: "Test", value: "test" }]}>
        <AppButton>Test checkbox popover</AppButton>
      </AppCheckboxPopover>
    );

    const button = screen.getByText("Test checkbox popover");
    button.click();

    expect(button).toBeInTheDocument();
    expect(screen.getByLabelText("Test")).toBeInTheDocument();
  });

  it("Date Picker", () => {
    render(<AntDatePicker data-testid="date-picker" />);

    expect(screen.getByTestId("date-picker")).toBeInTheDocument();
  });

  it("Dragger Upload", () => {
    render(
      <AppDraggerUpload data-testid="dragger-upload">
        <span>Test dragger upload</span>
      </AppDraggerUpload>
    );

    expect(screen.getByTestId("dragger-upload")).toBeInTheDocument();
    expect(screen.getByText("Test dragger upload")).toBeInTheDocument();
  });

  it("Error Page", () => {
    render(<AppState title="Test error page" subTitle="Just a test" />);

    expect(screen.getByText("Test error page")).toBeInTheDocument();
    expect(screen.getByText("Just a test")).toBeInTheDocument();
    expect(screen.getByText("Some other description")).toBeInTheDocument();
  });

  it("Form", () => {
    render(<AppForm data-testid="test-form" />);

    expect(screen.getByTestId("test-form")).toBeInTheDocument();
  });

  it("Input", () => {
    render(<AppInput placeholder="Test input" />);

    expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
  });

  it("Input Debounce", () => {
    render(<AppInput.Debounce placeholder="Test input debounce" />);

    expect(
      screen.getByPlaceholderText("Test input debounce")
    ).toBeInTheDocument();
  });

  it("Input number", () => {
    render(<AppInputNumber placeholder="Test input number" />);

    expect(
      screen.getByPlaceholderText("Test input number")
    ).toBeInTheDocument();
  });

  it("Input currency", () => {
    render(<AppInputNumber.Currency placeholder="Test input currency" />);

    expect(
      screen.getByPlaceholderText("Test input currency")
    ).toBeInTheDocument();
  });

  it("Radio popover", () => {
    render(
      <AppRadioPopover options={[{ label: "Test", value: "test" }]}>
        <AppButton>Test radio popover</AppButton>
      </AppRadioPopover>
    );

    const button = screen.getByText("Test radio popover");
    button.click();

    expect(button).toBeInTheDocument();
    expect(screen.getByLabelText("Test")).toBeInTheDocument();
  });

  it("Select", () => {
    render(
      <AppSelect
        data-testid="test-select"
        options={[{ label: "Test", value: "test" }]}
      />
    );

    expect(screen.getByTestId("test-select")).toBeInTheDocument();
  });

  it("Select Ajax", () => {
    render(
      <LoadingProvider component={AppMainLoading}>
        <AppSelect.Ajax
          data-testid="test-select"
          fetchFunc={() =>
            from([]).pipe(map(() => ({ options: [], hasMore: false })))
          }
        />
      </LoadingProvider>
    );

    expect(screen.getByTestId("test-select")).toBeInTheDocument();
  });

  it("Table", () => {
    render(
      <AppTable dataSource={[]}>
        <AppTable.Column title="Test table" dataIndex="test" />
      </AppTable>
    );
    expect(screen.getByText("Test table")).toBeInTheDocument();
  });

  it("Time Picker", () => {
    render(<AntTimePicker data-testid="test-time-picker" />);
    expect(screen.getByTestId("test-time-picker")).toBeInTheDocument();
  });
});
