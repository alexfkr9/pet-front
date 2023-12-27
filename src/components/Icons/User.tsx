interface IUserProps {
  size?: number;
  color?: string;
}

export default function User({ size = 24, color = "none" }: IUserProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15.75C13.1334 15.75 13.8764 15.55 14.4765 15.3593C14.5461 15.3371 14.6113 15.3162 14.6729 15.2963C15.1406 15.1458 15.3995 15.0625 15.7746 15.0625C18.3484 15.0625 20.5 17.2235 20.5 19.8633V20.9375C20.5 21.5441 20.0159 22 19.4643 22H4.53571C3.95519 22 3.5 21.5577 3.5 20.9375V19.8633C3.5 17.2138 5.61879 15.0625 8.18304 15.0625C8.55578 15.0625 8.81272 15.1445 9.27842 15.2932C9.34418 15.3142 9.4141 15.3365 9.4891 15.3601C10.0959 15.5511 10.8481 15.75 12 15.75ZM17.1071 7.1875C17.1071 10.0805 14.7904 12.375 12 12.375C9.17171 12.375 6.89286 10.0851 6.89286 7.1875C6.89286 4.32833 9.1762 2 12 2C14.7859 2 17.1071 4.33289 17.1071 7.1875Z"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
}