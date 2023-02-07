console.log("opentype test")

async function initFont() {
	const font = await opentype.load("/fonts/CommitMonoV38-450.otf")

	console.log(font)
	// console.log(font.glyphs.glyphs[50].path)
	// console.log(font.glyphs.glyphs[76].path)

	// const newFont = switchGlyphs(font, 50, 76)

	// console.log(newFont)
	// console.log(newFont.glyphs.glyphs[50].path)
	// console.log(newFont.glyphs.glyphs[76].path)

	const noSups = deleteFeature(font, "sups")

	console.log(noSups)
	font.download()
}

function deleteFeature(font, delFea) {
	// const featureIndex = font.tables.gsub.features.find((fea) => fea.tag == delFea)?.feature?.lookupListIndexes[0]
	// font.tables.gsub.lookups[featureIndex].subtables = [
	// 	{
	// 		coverage: {
	// 			format: 1,
	// 			glyphs: [17],
	// 		},
	// 		subsFormat: 2,
	// 		substitute: [18],
	// 	},
	// ]
	// const features = font.tables.gsub.features.map((fea) => {
	// 	if (fea.tag == delFea) return fea
	// })
	// console.log(features)
	// features.forEach((feature, index) => {
	// 	feature ? (font.tables.gsub.features[index] = feature) : null
	// })
	return font
}

function switchGlyphs(font, glyphIndexA, glyphIndexB) {
	const glyphPathA = font.glyphs.glyphs[glyphIndexA].path
	const glyphPathB = font.glyphs.glyphs[glyphIndexB].path
	font.glyphs.glyphs[glyphIndexB].path = glyphPathA
	font.glyphs.glyphs[glyphIndexA].path = glyphPathB
	return font
}

initFont()
