import Select, { components, ControlProps } from "react-select";
import "./FormSelect.scss";

interface ISelectProps {
  readonly value: string;
  readonly label?: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const Control = ({ children, ...props }: ControlProps<ISelectProps, false>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { lblText } = props.selectProps;

  return (
    <components.Control {...props}>
      <span className="sniff-select__lbl">{lblText}</span>
      {children}
    </components.Control>
  );
};

const FormSelect = (props: any) => {
  return (
    <Select
      {...props}
      className="sniff-select__container"
      classNamePrefix="sniff-select"
      components={{ Control }}
      isSearchable={false}
      // menuIsOpen={true}
    />
  );
};

export default FormSelect;
