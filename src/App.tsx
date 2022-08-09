const App: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 bg-blue-100"></div>
        <div className="flex-1 bg-green-100"></div>
      </div>

      <div className="flex-1 bg-red-100"></div>
    </div>
  );
};

export default App;
