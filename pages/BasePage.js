// pages/BasePage.js

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Generates a list of common fallback locator instructions based on the primary.
   * @param {Array} primaryInstruction - The primary locator instruction.
   * @returns {Array[]} An array of alternative locator instructions.
   */
  generateFallbackStrategies(primaryInstruction) {
    const strategies = [];
    const [method, ...args] = primaryInstruction;

    // We can only generate fallbacks if the primary locator has an accessible name.
    const options = args.find(arg => typeof arg === 'object');
    const accessibleName = options?.name;

    if (accessibleName) {
      // Strategy 1: Use the accessible name to find an element by its visible text.
      // This is a very common and strong fallback.
      strategies.push(['getByText', accessibleName, { exact: true }]);

      // Strategy 2: Convert the accessible name to a potential CSS ID.
      // Convention: "User Name" -> "user-name", "Submit" -> "submit"
      const derivedId = accessibleName.toLowerCase().replace(/\s+/g, '-');
      strategies.push(['locator', `#${derivedId}`]);

      // Strategy 3: Use the derived ID as a potential data-testid.
      strategies.push(['getByTestId', derivedId]);
    }
    
    return strategies;
  }

  /**
   * The upgraded "engine". It now only needs the primary locator.
   * @param {object} definition - The locator definition.
   * @param {Array} definition.primary - The primary locator instruction.
   */
  createHealedLocator({ primary }) {
    return async () => {
      const timeout = 2000;
      const buildLocator = (instruction) => this.page[instruction[0]](...instruction.slice(1));

      // 1. Try Primary
      const primaryLocator = buildLocator(primary);
      try {
        await primaryLocator.waitFor({ state: 'visible', timeout });
        return primaryLocator;
      } catch (error) {
        console.warn(`⚠️ Primary locator for [${primary.join(', ')}] failed. Generating fallbacks...`);
      }

      // 2. Generate and Try Alternatives
      const alternativeInstructions = this.generateFallbackStrategies(primary);
      
      for (const instruction of alternativeInstructions) {
        const alternativeLocator = buildLocator(instruction);
        try {
          await alternativeLocator.waitFor({ state: 'visible', timeout });
          console.log(`✅ HEALED: Found using generated alternative [${instruction.join(', ')}].`);
          return alternativeLocator;
        } catch (error) {
          // Ignore and continue
        }
      }
      
      throw new Error(`❌ Self-healing failed. All primary and generated fallbacks failed for: ${primary.join(', ')}`);
    };
  }
}

exports.BasePage = BasePage;
