export function RightPanel() {

    return (
        <div className='right-panel flex flex-column'>
            <div className='top-widget'>
                <img src="https://cdn.monday.com/images/homepage-desktop/templates-banner.png" alt="workspace.solutions_pr.image_alt" />
                <div className="flex flex-column">
                    <div className="banner-section-text">Boost your workflow in minutes with ready-made templates</div>
                    <div className="explore-button">Explore templates</div>
                </div>
            </div>

            <div className='bottom-widget'>
                <h2 className="section-title">Learn &amp; get inspired</h2>
                <div className="widget flex flex-row">
                    <img className="card-image" src="https://cdn.monday.com/images/learning-center/get-started-2.svg" />
                    <div className="content">
                        <div className="title">Getting started</div>
                        <div className="description">Learn how monday.com works</div>
                    </div>
                </div>
                <div className="widget flex flex-row">
                    <img className="card-image" src="https://cdn.monday.com/images/learning-center/help-center.svg" />
                    <div className="content">
                        <div className="title">Help center</div>
                        <div className="description">Learn and get support</div>
                    </div>
                </div>
            </div>
        </div>
    )
}