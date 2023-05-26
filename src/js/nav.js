const navForm = document.querySelector("#nav_form")

websiteData.sections.forEach((section, index) => {
	const div = document.createElement("div")
	const input = document.createElement("input")
	input.type = "radio"
	input.name = "nav"
	input.id = section.name
	input.classList.add("nav_section_input")
	input.value = `section_${index + 1}`
	if (index == 0) input.setAttribute("checked", "true")
	const label = document.createElement("label")
	label.for = section.name
	label.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
	label.classList.add("nav_element")
	label.dataset.sectionIndex = index + 1
	label.setAttribute("for", section.name)
	div.append(input, label)
	navForm.append(div)
	if (index == 0) {
		setTimeout(() => {
			console.log(input, "input focus")
			input.focus()
		}, 1)
	}
})

function updateNav(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}
	websiteData.sections.forEach((section, index) => {
		const sectionContainer = document.querySelector(`#section_${index + 1}`)
		if (sectionContainer.id == output) {
			sectionContainer.style.display = "block"
		} else {
			sectionContainer.style.display = "none"
		}
	})
	if (event) event.preventDefault()
}

let currentSection = 1
let insideTextField = false

window.addEventListener("keydown", (e) => {
	console.log(e.code, e.shiftKey)

	// show keypress on frontpage
	const activeKey = !e.shiftKey
		? document.querySelector(`.key[data-key-code="${e.code}"]`)
		: document.querySelector(`.key[data-key-code="Shift${e.code}"]`)
	activeKey?.classList.add("active_key")

	// push page
	if (
		e.code == "KeyW" ||
		e.code == "KeyA" ||
		e.code == "KeyS" ||
		e.code == "KeyD" ||
		e.code == "KeyR" ||
		e.code == "Minus" ||
		e.code == "Slash"
	) {
		main.style.opacity = 0.04
		pushPage(e.code)
	}
})

const main = document.querySelector("main")
const mainScale = document.querySelector("#main_scale")
const rem = getComputedStyle(document.documentElement).fontSize.split("px")[0]

window.addEventListener("keyup", (e) => {
	const activeKey = document.querySelector(".active_key")
	activeKey?.classList.remove("active_key")

	main.style.opacity = 1

	if (e.code == "Tab" && document.activeElement.id.includes("block_tab")) {
		console.log("active nav section then tab")
		const checkedMenuInput = document.querySelector("#nav_form input:checked")
		checkedMenuInput.focus()
	}
})

function pushPage(keyCode) {
	const x = websiteData.pushPage.coordinates.x
	const y = websiteData.pushPage.coordinates.y
	const scale = websiteData.pushPage.scale
	const dist = (websiteData.pushPage.distance * rem) / scale
	const scaleOffset = websiteData.pushPage.scaleOffset

	// move left
	if (keyCode == "KeyW") {
		main.style.transform = `translate(${x}px, ${y + dist}px)`
		websiteData.pushPage.coordinates.y += dist
	}

	// move left
	else if (keyCode == "KeyA") {
		main.style.transform = `translate(${x + dist}px, ${y}px)`
		websiteData.pushPage.coordinates.x += dist
	}

	// move down
	else if (keyCode == "KeyS") {
		main.style.transform = `translate(${x}px, ${y - dist}px)`
		websiteData.pushPage.coordinates.y -= dist
	}

	// move right
	else if (keyCode == "KeyD") {
		main.style.transform = `translate(${x - dist}px, ${y}px)`
		websiteData.pushPage.coordinates.x -= dist
	}

	// zoom in ("Minus" is the plus key, very confusing)
	else if (keyCode == "Minus") {
		mainScale.style.transform = `scale(${scale * scaleOffset})`
		websiteData.pushPage.scale *= scaleOffset
	}

	// zoom out
	else if (keyCode == "Slash") {
		mainScale.style.transform = `scale(${scale / scaleOffset})`
		websiteData.pushPage.scale /= scaleOffset
	}

	// reset transforms
	else if (keyCode == "KeyR") {
		main.style.transform = `translate(0px, 0px)`
		mainScale.style.transform = `scale(1)`
		websiteData.pushPage.coordinates.x = 0
		websiteData.pushPage.coordinates.y = 0
		websiteData.pushPage.scale = 1
	}
}

let active // saves what DOM element is currently active
let focusTimeOutID // to be able to use clearTimeout()
document.addEventListener("focusin", (e) => {
	console.log(document.activeElement)
	// save current focused element
	active = document.activeElement

	// when current focused element is blurred, start a timer of 100ms.
	active.addEventListener("blur", onBlurIn)

	// clear timeout when a new element is focused
	clearTimeout(focusTimeOutID)
	focusTimeOutID = null

	// console.log(active, active.getAttribute("contenteditable"))
	if (active.dataset.edit === "true") {
		active.setAttribute("contenteditable", "true")
		insideTextField = true
	}

	if (active.id.includes("block_tab")) {
		console.log("active nav section then tab")
		const checkedMenuInput = document.querySelector("#nav_form input:checked")
		checkedMenuInput.focus()
	}
})

document.onvisibilitychange = function () {
	console.log("onvisibilitychange")
}

function onBlurIn(e) {
	// remove event listener from so they don't stack
	e.target.removeEventListener("blur", onBlurIn)

	// if this timer runs out before a new element is focused, refocus same element
	focusTimeOutID = setTimeout(() => active.focus(), 100)
}

updateNav(null, navForm)
