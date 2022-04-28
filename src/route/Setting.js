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
