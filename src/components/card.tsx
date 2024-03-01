export const Card = () => {
  const greetings: string = "Hello, World!";

  return (
    <div className="card">
      <div className="card-header"></div>
      <div className="card-body">
        <p>{greetings}</p>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};
