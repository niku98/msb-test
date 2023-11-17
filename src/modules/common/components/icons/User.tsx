interface UserProps {
  className?: string;
}

const User = ({ className }: UserProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M9 2.25C7.15905 2.25 5.66667 3.76104 5.66667 5.625C5.66667 7.48896 7.15905 9 9 9C10.8409 9 12.3333 7.48896 12.3333 5.625C12.3333 3.76104 10.8409 2.25 9 2.25Z"
        fill="currentColor"
      />
      <path
        d="M6.33333 10.35C5.44928 10.35 4.60143 10.7056 3.97631 11.3385C3.35119 11.9714 3 12.8299 3 13.725V15.075C3 15.4478 3.29848 15.75 3.66667 15.75H14.3333C14.7015 15.75 15 15.4478 15 15.075V13.725C15 12.8299 14.6488 11.9714 14.0237 11.3385C13.3986 10.7056 12.5507 10.35 11.6667 10.35H6.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default User;
