const calculatePopulationScore = (
  govType: string,
  populationCount: number,
  secondaryGovType?: string,
  secondaryPopulationCount?: number,
) => {
  const INDIGENOUS_GOVERNMENT = ['indigenousGovernment', 'indigenousCorporation'];

  if (
    INDIGENOUS_GOVERNMENT.includes(govType) ||
    (secondaryGovType && INDIGENOUS_GOVERNMENT.includes(secondaryGovType))
  ) {
    return 15;
  }

  let populationNumber = populationCount;
  if (secondaryPopulationCount && secondaryPopulationCount > populationNumber) {
    populationNumber = secondaryPopulationCount;
  }

  if (populationNumber <= 15000) return 10;
  if (populationNumber > 15000 && populationNumber <= 25000) return 5;

  return 0;
};

const calculateSafetyScore = (s6Container: any) => {
  if (!s6Container) return 0;

  let score = 0;

  if (s6Container.s6AdditionalSafetyMaintenancePlan) score++;
  if (s6Container.s6AdditionalSafetyLighting) score++;
  if (s6Container.s6AdditionalSafetyLoweredSpeedLimit) score++;
  if (s6Container.s6AdditionalSafetySignage) score++;
  if (s6Container.s6AdditionalSafetyOther) score++;

  if (
    s6Container.s6DoesTheProposedInfrastructureAlignWithTheDesignGuideRecommendations ===
      'yesDesired' ||
    s6Container.s6DoesTheProposedInfrastructureAlignWithTheDesignGuideRecommendations === 'na'
  ) {
    score += 4;
  }

  if (
    s6Container.s6DoesTheProposedInfrastructureAlignWithTheDesignGuideRecommendations ===
    'yesConstrained'
  ) {
    score += 2;
  }

  if (
    s6Container.s6DoesProposedInfrastructureAlignWithDesignGuide === 'na' ||
    s6Container.s6DoesProposedInfrastructureAlignWithDesignGuide === 'yes'
  ) {
    score += 4;
  }

  return score;
};

const calculateLandUseScore = (s7Container: any) => {
  if (!s7Container) return 0;

  let score = 0;

  if (s7Container.s7ModesOfTransportation) {
    const transportationScore = Object.values(s7Container.s7ModesOfTransportation).filter(
      item => item,
    ).length;
    transportationScore > 3 ? (score += 3) : (score += transportationScore);
  }

  if (s7Container.s7otherCommunityInfrastructure) {
    const communityScore = Object.values(s7Container.s7otherCommunityInfrastructure).filter(
      item => item,
    ).length;
    communityScore > 4 ? (score += 4) : (score += communityScore);
  }

  if (s7Container.s7activeTransportationInfrastructure) {
    const activeTransportationScore = Object.values(
      s7Container.s7activeTransportationInfrastructure,
    ).filter(item => item).length;
    activeTransportationScore > 3 ? (score += 3) : (score += activeTransportationScore);
  }
  return score;
};

export const getInfrastructureAutomatedScores = (data: any) => {
  if (!data) return;

  const s1Container = data.s1Container;
  const s6Container = data.s6Container;
  const s7Container = data.s7Container;
  let populationScore = 0;
  let landUseScore = 0;
  let safetyScore = 0;

  if (s1Container) {
    populationScore = calculatePopulationScore(
      s1Container.s1GovernmentType,
      s1Container.s1PrimaryCommunityPopulation,
      s1Container.s1SecondaryGovernmentType,
      s1Container.s1SecondaryContactCommunityPopulation,
    );
  }

  safetyScore = calculateSafetyScore(s6Container);
  landUseScore = calculateLandUseScore(s7Container);

  return {
    landUseScore,
    populationScore,
    safetyScore,
  };
};
