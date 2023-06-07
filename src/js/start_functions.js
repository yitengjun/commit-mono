let waitingForLoadIntervalID = null
let allCssLoaded = false
function startAll() {
   console.log("startAll")

   appendStyleSheets()

   fillSectionData()

   buildNav()

   buildTable()

   buildFamiliar()

   buildCode()

   buildDistinction()

   buildGTC()

   buildExample()

   buildDocumentation()

   updateCodeFont()

   updateWaterfall()

   changeFavicon(true)

   websiteData.sections.forEach((section, index) => {
      const pathName = window.location.pathname.slice(1)
      if (pathName == "" && index == 0) {
         sectionNavigation(0)
      } else if (section.name == pathName) {
         sectionNavigation(index)
      }
   })

   setInterval(checkDocumentFocus, 100)

   waitingForLoadIntervalID = setInterval(() => {
      if (allCssLoaded) {
         document.querySelector("#navigate_description").focus()
         document.querySelector("#loading").style.display = "none"
         clearInterval(waitingForLoadIntervalID)
         waitingForLoadIntervalID = null
      }
   }, 100)
}

if (fontsLoaded) {
   console.log("fontsLoaded startAll()")
   startAll()
}
