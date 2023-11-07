const History = ({history,currentMove,moveTo}) =>{
return (
    <div className="history-wrapper">
        <ul className="history">
            {history.map((abc,index) => {
               return  <li key={index}>
                  <button type="button" className={`btn-move ${currentMove === index ? 'active' : '' }`} onClick={() => moveTo(index)}
                  >
                    {index === 0 ? 'Go to game start' : `Go to move ${index}`}
                  </button>
                </li>;
            })
            }
        </ul>
    </div>
)
}

export default History;