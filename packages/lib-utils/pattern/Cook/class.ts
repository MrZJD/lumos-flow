
export class Cook {
  context;
  Provider;
}

export default Cook;

function SomeComponent {
  const { current: cook } = useRef(new Cook());

  const { data } = useApi();

  useEffect(() => {
    cook.update(data);
  }, [cook])

  return (
    <div>
      <div>123</div>
    </div>
  );
}
