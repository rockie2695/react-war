import Header from "../components/main/Header";

export default function Setting() {
  return (
    <div className="w-full min-h-full">
      <Header title="Setting" />
      <div className="main-content md:p-4 p-2">
        <fieldset className="border border-black">
          <legend className="text-center">test</legend>
          <div>test</div>
        </fieldset>
        <div>
          <h2 className="title text-lg font-bold">Number of adding people</h2>
          <div className="content grid grid-cols-2 md:gap-4 gap-2 md:p-4 p-2 bg-gray-300">
            <label htmlFor="numAddPeople">Number of adding people:</label>
            <input
              type="number"
              id="numAddPeople"
              name="numAddPeople"
              className="rounded p-1 text-center"
              minLength={1}
              maxLength={3}
              min={1}
              max={100}
            />
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>123</td>
              <td>456</td>
              <td>123</td>
              <td>456</td>
            </tr>
            <tr>
              <td>789</td>
              <td>321</td>
              <td>123</td>
              <td>456</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
