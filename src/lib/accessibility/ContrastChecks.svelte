<script lang="ts">
	import { formatHex, wcagContrast, type Hsl } from 'culori';

	export let contrast: number;
	export let hslColor: Hsl;
	export let secHslColor: Hsl;

	const WHITE: Hsl = {
		mode: 'hsl',
		h: undefined,
		s: 0.0,
		l: 1.0
	};

	const BLACK: Hsl = {
		mode: 'hsl',
		h: undefined,
		s: 0.0,
		l: 0.0
	};

	interface WcagDefinition {
		name: string;
		ratio: number;
	}

	const contrastLevels: WcagDefinition[] = [
		{
			name: 'WCAG AA (large text)',
			ratio: 3.0
		},
		{
			name: 'WCAG AA',
			ratio: 4.5
		},
		{
			name: 'WCAG AAA (large text)',
			ratio: 4.5
		},
		{
			name: 'WCAG AAA',
			ratio: 7.0
		}
	];

	interface WcagResultPassed {
		passed: true;
		colorRecommendation: undefined;
		secColorRecommendation: undefined;
	}

	interface WcagResultFailed {
		passed: false;
		colorRecommendation: Hsl;
		secColorRecommendation: Hsl;
	}

	type WcagResult = WcagResultPassed | WcagResultFailed;

	interface WcagCheck {
		definition: WcagDefinition;
		result: WcagResult;
	}

	const lightnessSteps = 0.05;

	function findBetterColor(comparisonColor: Hsl, changingColor: Hsl, targetContrast: number) {
		const whiteContrast = wcagContrast(comparisonColor, WHITE);
		const blackContrast = wcagContrast(comparisonColor, BLACK);

		let step;

		if (changingColor.l >= comparisonColor.l && whiteContrast >= targetContrast) {
			// The changing color is lighter than the comparison color
			// We also know that at least white would have sufficient contrast
			// We can make the color lighter until we reach the required contrast ratio
			step = lightnessSteps;
		} else if (blackContrast >= targetContrast) {
			// The changing color is darker than the comparison color
			// (Or it is lighter, but making it even lighter is not sufficient)
			// We also know that at least black would have sufficient contrast
			// We can make the color darker until we reach the required contrast ratio
			step = -lightnessSteps;
		} else {
			// Neither white nor black would reach the required contrast ratio
			// (Normally this shouldn't happen, but it's best to still cover the case)
			// We choose the color that has at least better contrast
			if (whiteContrast >= blackContrast) {
				return WHITE;
			} else {
				return BLACK;
			}
		}

		// Now adjust the lightness until the required contrast is reached
		let curColor = changingColor;

		while (wcagContrast(comparisonColor, curColor) < targetContrast) {
			curColor = { ...curColor, l: curColor.l + step };

			// Make sure that we keep the color valid
			if (curColor.l > 1.0) {
				return WHITE;
			}
			if (curColor.l < 0.0) {
				return BLACK;
			}
		}

		return curColor;
	}

	$: checks = contrastLevels.map((definition) => {
		const passed = contrast >= definition.ratio;

		if (passed) {
			return {
				definition,
				result: {
					passed,
					colorRecommendation: undefined,
					secColorRecommendation: undefined
				}
			};
		}

		const colorRecommendation = findBetterColor(secHslColor, hslColor, definition.ratio);
		const secColorRecommendation = findBetterColor(hslColor, secHslColor, definition.ratio);

		return {
			definition,
			result: {
				passed,
				colorRecommendation,
				secColorRecommendation
			}
		};
	});
</script>

<div class="contrast-checks">
	<table>
		<tr>
			<th>WCAG Standard</th>
			<th>Ratio</th>
			<th>Passed</th>
			<th>Better primary</th>
			<th>Better secondary</th>
		</tr>
		{#each checks as { definition, result }}
			<tr>
				<td>{definition.name}</td>
				<td>{definition.ratio}</td>
				<td>{result.passed ? '✓' : '✗'}</td>
				<td>
					{#if result.colorRecommendation}
						{formatHex(result.colorRecommendation)}
					{/if}
				</td>
				<td>
					{#if result.secColorRecommendation}
						{formatHex(result.secColorRecommendation)}
					{/if}
				</td>
			</tr>
		{/each}
	</table>
</div>
