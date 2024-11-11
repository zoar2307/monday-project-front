import logo from '../assets/img/logo.png'

export function BoardHeader({ isSidebarClosed }) {
  return (
    <>
      <header className="board-header flex justify-between align-center" style={{
        marginLeft: isSidebarClosed ? '40px' : '0',
        transition: 'margin-left 0.7s ease', // Adding a smooth transition
      }}>
        <div className="flex align-center">
          <img src={logo} alt="Logo" />
          <h1 className="logo-home-nav">Sundae</h1>
        </div>
        <div className="board-header-btns flex  align-center">
          <div>
            <button>
              <i className="fa-regular fa-bell"></i>
            </button>
            <button>
              <i className="fa-solid fa-inbox"></i>
            </button>
            <button>
              <i className="fa-solid fa-user-plus"></i>
            </button>
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div>
            <button>
              <div class="right-logo-container">
                <img class="right-logo" src={logo} alt="Logo" />
              </div>
            </button>

          </div>
        </div>
      </header>
    </>
  )
}