
const NoResultsDiv = () => {
  return (
    <div className="no-results">
        <img src="icons/no-result.svg" alt="No Result" className="icon" />
        <h3 className="title">Something Went Wrong!</h3>
        <p className="message">we&apos;re Unable to retrieve the weather details.ensure you&apos;ve entered a valid city or try again later.</p>
    </div>
  );
};

export default NoResultsDiv;
