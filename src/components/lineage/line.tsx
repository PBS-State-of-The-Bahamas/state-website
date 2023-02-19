type Terms = "Spring" | "Summer" | "Fall";

export interface LineProps {
  key: number;
  term: Terms;
  year: number;
  ship_name: string;
}

export default function Line(props: LineProps) {
  return (
    <div
      key={props.key}
      className="rounded-lg shadow-lg p-8 bg-pure-white hover:bg-gray-2 md:w-1/4 w-full"
    >
      <span className="text-heading-4">
        {props.term} {props.year}
      </span>
      <div className="text-heading-6">{props.ship_name}</div>
    </div>
  );
}