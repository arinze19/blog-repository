import Input from './Input';

export default {
  title: 'Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const InputComponent = Template.bind({});
InputComponent.args = {
  size: 'sm',
  buttonColor: '#5001d0',
  placeholder: 'Enter your text here',
  buttonText: 'Submit',
};
