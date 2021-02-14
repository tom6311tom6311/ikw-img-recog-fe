function Header(props) {
  const { title } = props;
  return (
    <div className="flex flex-col text-center w-full my-5">
      <h1 className="sm:text-4xl text-3xl font-bold title-font mb-2 text-gray-900">{title}</h1>
    </div>
  );
}

export default Header;
