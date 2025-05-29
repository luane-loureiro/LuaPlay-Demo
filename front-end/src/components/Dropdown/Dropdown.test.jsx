import { render, screen } from "@testing-library/react";
import Dropdown from "./index";

test("deve aplicar o atributo required quando passado", () => {
  render(
    <Dropdown
      label="Playlist"
      required={true}
      options={[
        { value: "1", label: "Opção 1" },
        { value: "2", label: "Opção 2" },
        { value: "3", label: "Opção 3" },
      ]}
      value=""
      onChange={() => {}}
      id="playlist"
    />
  );

  const select = screen.getByLabelText(/Playlist/i);
  expect(select).toBeRequired();

  const asterisk = screen.getByLabelText("Campo obrigatório");
  expect(asterisk).toBeInTheDocument();
});
