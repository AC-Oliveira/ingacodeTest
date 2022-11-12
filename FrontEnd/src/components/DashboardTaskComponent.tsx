export function DashboardTaskComponent({ task }: { task: string }): JSX.Element {
  return (
    <div className="row p-3 align-items-center justify-content-start mt-2">
      <div className="col-12 col-sm-6 col-md-6">
        <p className="text-danger mb-0 fs-4 fw-semibold text-center text-sm-end">Task atual:</p>
      </div>
      <div className="col-12 col-sm-6 col-md-6">
        <p className="text-blue-600 ms-3 ms-lg-0 mb-0 fs-4 fw-semibold text-center text-sm-start">{task}</p>
      </div>
    </div>
  );
}
