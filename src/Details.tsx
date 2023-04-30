export interface DetailsParams {
  element: JSX.Element;
}

export default function Details(props: DetailsParams) {
  const { element } = props;
  return (<>{element}</>);
}