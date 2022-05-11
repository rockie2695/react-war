import Header from "../components/main/Header";

export default function Setting() {
  return (
    <div className="w-full min-h-full">
      <Header title="Setting" />
      <div className="main-content md:p-4 p-2 grid grid-cols-4">
        <div className="md:col-span-3 col-span-4">
          <div>
            <h2 className="title text-lg font-bold">Number of adding people</h2>
            <div className="content md:py-2 py-2 bg-gray-300 rounded-lg">
              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors min-h-[2.5rem]">
                <label
                  className="flex-1 flex items-center"
                  htmlFor="numAddPeople"
                >
                  Number of adding people:
                </label>
                <input
                  type="number"
                  id="numAddPeople"
                  name="numAddPeople"
                  className="rounded p-1 text-center flex-1"
                  minLength={1}
                  maxLength={3}
                  min={1}
                  max={100}
                />
              </div>

              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors">
                <label
                  className="flex-1 flex items-center"
                  htmlFor="numAddPeople"
                >
                  Number of adding people:
                </label>
                <input
                  type="number"
                  id="numAddPeople"
                  name="numAddPeople"
                  className="rounded p-1 text-center flex-1"
                  minLength={1}
                  maxLength={3}
                  min={1}
                  max={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 hidden">test</div>
      </div>
    </div>
  );
}
