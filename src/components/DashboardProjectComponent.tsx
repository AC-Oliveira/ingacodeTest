export function DashboardProjectComponent({ project }: { project: string }): JSX.Element {
  return (
    <div className="row p-3 align-items-center justify-content-start mt-2">
      <div className="col-12 col-sm-6 col-md-6">
        <h3 className="text-danger mb-0 fw-bold py-2 py-md-0 text-center text-sm-end">Projeto atual:</h3>
      </div>
      <div className="col-12 col-sm-6 col-md-6">
        <h3 className="text-blue-600 mb-0 fw-bold text-center text-sm-start">{project}</h3>
      </div>
    </div>
  );
}
