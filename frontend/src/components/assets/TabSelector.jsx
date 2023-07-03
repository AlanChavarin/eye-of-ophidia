//css
import TabSelectorCSS from './styles/TabSelector.module.css'

function TabSelector({tabsArray, selectedTab, setSelectedTab, disableCSS}) {
  return (
    <div className={TabSelectorCSS.parent}>
        {tabsArray.map(tab => (
            <button 
                className={`${tab===selectedTab && TabSelectorCSS.selectedButton} ${TabSelectorCSS.button}`}
                onClick={(e) => {
                    e.preventDefault()
                    setSelectedTab(tab)
                }}
                >
                {tab}
            </button>
        ))}
    </div>
  )
}
export default TabSelector