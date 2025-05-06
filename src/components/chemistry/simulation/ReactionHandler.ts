
import { Chemical, ChemicalMixture, ReactionResult } from '@/types/experiments';

interface ProcessedReactionResult {
  type: 'color' | 'precipitate' | 'gas' | 'temperature' | 'explosion';
  observation: string;
  equation?: string;
}

class ReactionHandler {
  processReactions(
    contents: ChemicalMixture[],
    allChemicals: Chemical[],
    currentTemperature: number
  ): ProcessedReactionResult[] {
    const results: ProcessedReactionResult[] = [];
    const chemicalsInMixture = contents.map(content => 
      allChemicals.find(c => c.id === content.chemicalId)
    ).filter(Boolean) as Chemical[];
    
    // Process each possible pair of chemicals for reactions
    for (let i = 0; i < chemicalsInMixture.length; i++) {
      const chemical1 = chemicalsInMixture[i];
      
      // Check if this chemical is reactive
      if (!chemical1.reactions) continue;
      
      // Check reactions with other chemicals
      for (let j = 0; j < chemicalsInMixture.length; j++) {
        if (i === j) continue;
        
        const chemical2 = chemicalsInMixture[j];
        const reaction = chemical1.reactions[chemical2.id];
        
        if (reaction) {
          // Process color change
          if (reaction.colorChange) {
            results.push({
              type: 'color',
              observation: `The mixture changed color to ${reaction.colorChange}`,
              equation: reaction.equation
            });
          }
          
          // Process precipitate formation
          if (reaction.precipitate) {
            results.push({
              type: 'precipitate',
              observation: `${reaction.productName || 'A precipitate'} formed in the solution`,
              equation: reaction.equation
            });
          }
          
          // Process gas production
          if (reaction.gasProduction) {
            results.push({
              type: 'gas',
              observation: `${reaction.gasName || 'Gas'} bubbles are forming in the mixture`,
              equation: reaction.equation
            });
          }
          
          // Process temperature change
          if (reaction.temperatureChange) {
            const tempDirection = reaction.temperatureChange > 0 ? 'increased' : 'decreased';
            results.push({
              type: 'temperature',
              observation: `Temperature ${tempDirection} by ${Math.abs(reaction.temperatureChange)}°C`,
              equation: reaction.equation
            });
          }
        }
      }
    }
    
    // Special case - Zinc + HCl in a test tube
    const hasZinc = chemicalsInMixture.some(c => c.id === 'zn');
    const hasStrongAcid = chemicalsInMixture.some(c => c.type === 'acid' && c.hazardLevel === 'high');
    
    if (hasZinc && hasStrongAcid) {
      // Gas is produced, if in a sealed container (test tube) could explode
      results.push({
        type: 'gas',
        observation: 'Hydrogen gas is rapidly evolving from the reaction',
        equation: 'Zn + 2HCl → ZnCl₂ + H₂↑'
      });
      
      // In test tubes with limited space, it could explode due to pressure
      if (contents.length >= 2) {
        results.push({
          type: 'explosion',
          observation: 'The rapid hydrogen production created too much pressure!',
          equation: 'Zn + 2HCl → ZnCl₂ + H₂↑ (pressure buildup)'
        });
      }
    }
    
    // Flame tests for metal salts when heated
    const hasFlameSensitive = chemicalsInMixture.some(c => 
      c.reactions && c.reactions.flame
    );
    
    if (hasFlameSensitive && currentTemperature > 50) {
      for (const chemical of chemicalsInMixture) {
        if (chemical.reactions && chemical.reactions.flame) {
          const flameColor = this.getFlameColorName(chemical.reactions.flame.flameColor || '');
          results.push({
            type: 'color',
            observation: `The flame turns ${flameColor} from the ${chemical.name}`,
            equation: chemical.reactions.flame.equation || `${chemical.name} + heat → colored emission`
          });
        }
      }
    }
    
    return results;
  }
  
  private getFlameColorName(colorCode: string): string {
    const colors: Record<string, string> = {
      '#FF0000': 'red',
      '#00FF00': 'green',
      '#0000FF': 'blue',
      '#FFFF00': 'yellow',
      '#FFA500': 'orange',
      '#800080': 'purple',
      '#FFC0CB': 'pink',
      '#00FFFF': 'cyan',
      '#FF00FF': 'magenta',
      '#FFFFFF': 'white',
      '#F8F8F8': 'white',
      '#00FF7F': 'blue-green',
      '#FF7F00': 'orange-red'
    };
    
    return colors[colorCode] || 'colored';
  }
}

export default ReactionHandler;
