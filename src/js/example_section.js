const exampleForm = document.querySelector("#examples_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")
const weightsFieldset = document.querySelector("#weights")

websiteData.sections.forEach((section) => {
	if (section.name == "test") {
		section.content.languages.forEach((language, index) => {
			const div = document.createElement("div")
			const input = document.createElement("input")
			input.type = "radio"
			input.name = "nav"
			input.id = language.languageName
			input.classList.add("example_language")
			input.value = language.languageName
			if (index == 0) input.setAttribute("checked", "true")
			const label = document.createElement("label")
			label.textContent = language.languageName
			label.setAttribute("for", language.languageName)
			div.append(input, label)
			exampleFieldset.append(div)
		})

		section.content.weights.forEach((weight, index) => {
			const div = document.createElement("div")
			const input = document.createElement("input")
			input.type = "radio"
			input.name = "nav"
			input.id = `weight_${weight}`
			input.classList.add("example_weight")
			input.value = weight
			if (index == 6) input.setAttribute("checked", "true")
			const label = document.createElement("label")
			label.textContent = weight
			label.setAttribute("for", `weight_${weight}`)
			div.append(input, label)
			weightsFieldset.append(div)
		})
	}
})

const codeExample = document.querySelector("#code_example")
function updateExamples(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}

	websiteData.sections.forEach((section) => {
		if (section.name == "test") {
			section.content.languages.forEach((language, index) => {
				if (language.languageName == output) {
					codeExample.textContent = language.codeExample
					// const lines = language.codeExample
					// 	.split("\n")
					// 	.map((_, i) => i + 1)
					// 	.join("\n")
					let nums = Array.from(new Array(1000), (x, i) => i + 1).join("\n")
					// console.log(lines, nums)
					codeExample.setAttribute("data-before", nums)
				}
			})
		}
	})

	if (event) event.preventDefault()
}

function updateExamplesettings(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		if (entry[0] != "nav") output += `${entry[1]}, `
	}

	const codeExample = document.querySelector("#code_example")
	codeExample.style.fontFeatureSettings = output.slice(0, -2)

	if (event) event.preventDefault()
}

updateExamples(null, exampleForm)
