export interface LineMemberProps {
  key: number;
  line_number: number;
  line_name: string;
}

export default function LineMember(props: LineMemberProps) {
  return (
    <div key={props.key}>
      <div>
        #{props.line_number}-{props.line_name}
      </div>
    </div>
  );
}
