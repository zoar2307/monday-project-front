export function RightPanel() {

    return (
        <div className='right-panel flex flex-column'>
            <div className='top-widget'>
                <img src="https://cdn.monday.com/images/homepage-desktop/templates-banner.png" alt="workspace.solutions_pr.image_alt" />
                <div className="flex flex-column">
                    <div class="banner-section-text">Boost your workflow in minutes with ready-made templates</div>
                    <div className="explore-button">Explore templates</div>
                </div>
            </div>

            <div className='bottom-widget'>
                <h2 class="section-title">Learn &amp; get inspired</h2>
                <div className="widget flex flex-row">
                    <img class="card-image" src="https://cdn.monday.com/images/learning-center/get-started-2.svg" />
                    <div class="content">
                        <div class="title">Getting started</div>
                        <div class="description">Learn how monday.com works</div>
                    </div>
                </div>
                <div className="widget flex flex-row">
                    <img class="card-image" src="https://cdn.monday.com/images/learning-center/help-center.svg" />
                    <div class="content">
                        <div class="title">Help center</div>
                        <div class="description">Learn and get support</div>
                    </div>
                </div>
            </div>
        </div>
    )
}