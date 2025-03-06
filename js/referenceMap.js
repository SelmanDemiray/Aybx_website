/**
 * This file contains the correct page references for the Discover Canada study guide.
 * Used to ensure question references accurately point to the correct pages.
 */

const referenceMap = {
    // Rights and Responsibilities section
    "rights-responsibilities": {
        "general": "Discover Canada, p. 8-9, 'Rights and Responsibilities of Citizenship'",
        "charter": "Discover Canada, p. 8, 'Rights and Responsibilities of Citizenship'",
        "freedoms": "Discover Canada, p. 8, 'Rights and Responsibilities of Citizenship'",
        "responsibilities": "Discover Canada, p. 9, 'Citizenship Responsibilities'",
        "equality": "Discover Canada, p. 9, 'The equality of Women and Men'",
        "defending": "Discover Canada, p. 9, 'Defending Canada'"
    },
    
    // Who We Are section
    "identity": {
        "general": "Discover Canada, p. 10-13, 'Who We Are'",
        "aboriginal": "Discover Canada, p. 10-11, 'Aboriginal Peoples'",
        "english-french": "Discover Canada, p. 11, 'English and French'",
        "diversity": "Discover Canada, p. 12-13, 'Diversity in Canada'"
    },
    
    // History section - early history
    "history": {
        "aboriginal-history": "Discover Canada, p. 14, 'Aboriginal Peoples'",
        "early-explorers": "Discover Canada, p. 14, 'The First Europeans'",
        "new-france": "Discover Canada, p. 15, 'Royal New France'",
        "struggle": "Discover Canada, p. 15, 'Struggle for a Continent'",
        "quebec": "Discover Canada, p. 15, 'The Province of Quebec'",
        "loyalists": "Discover Canada, p. 15-16, 'United Empire Loyalists'",
        "war-1812": "Discover Canada, p. 16-17, 'The War of 1812: The Fight for Canada'",
        "democracy": "Discover Canada, p. 16, 'The Beginnings of Democracy'",
        "slavery": "Discover Canada, p. 17, 'Abolition of Slavery'",
        "economy": "Discover Canada, p. 17, 'A Growing Economy'",
        "rebellions": "Discover Canada, p. 17, 'Rebellions of 1837-38'"
    },
    
    // History section - Confederation and expansion
    "confederation": {
        "general": "Discover Canada, p. 19, 'The Fathers of Confederation'",
        "dominion": "Discover Canada, p. 19, 'Dominion of Canada'",
        "expansion": "Discover Canada, p. 19, 'Expansion of the Dominion'",
        "macdonald": "Discover Canada, p. 19, 'Canada's First Prime Minister'",
        "west-challenge": "Discover Canada, p. 20, 'Challenge in the West'",
        "riel": "Discover Canada, p. 20, 'Challenge in the West'",
        "mounties": "Discover Canada, p. 20, 'Challenge in the West'",
        "railway": "Discover Canada, p. 20, 'A Railway from Sea to Sea'",
        "immigration": "Discover Canada, p. 21, 'Moving Westward'"
    },
    
    // History section - World Wars
    "world-wars": {
        "boer-war": "Discover Canada, p. 21, 'The First World War'",
        "ww1": "Discover Canada, p. 21, 'The First World War'",
        "remembrance-day": "Discover Canada, p. 21-22, 'Remembrance Day'",
        "in-flanders-fields": "Discover Canada, p. 22, 'Remembrance Day'",
        "vimy-ridge": "Discover Canada, p. 21, 'The First World War'",
        "vimy-day": "Discover Canada, p. 21, 'The First World War'",
        "currie": "Discover Canada, p. 21, 'The First World War'",
        "between-wars": "Discover Canada, p. 22, 'Between the wars'",
        "great-depression": "Discover Canada, p. 22, 'Between the wars'",
        "roaring-twenties": "Discover Canada, p. 22, 'Between the wars'",
        "ww2": "Discover Canada, p. 23, 'The Second World War'",
        "d-day": "Discover Canada, p. 22-23, 'The D-Day Invasion'",
        "normandy": "Discover Canada, p. 22-23, 'The D-Day Invasion'",
        "juno-beach": "Discover Canada, p. 22-23, 'The D-Day Invasion'",
        "hong-kong": "Discover Canada, p. 23, 'The Second World War'",
        "dieppe": "Discover Canada, p. 23, 'The Second World War'",
        "battle-of-britain": "Discover Canada, p. 23, 'The Second World War'",
        "battle-of-atlantic": "Discover Canada, p. 23, 'The Second World War'",
        "japanese-relocation": "Discover Canada, p. 23, 'The Second World War'"
    },
    
    // Women's rights
    "womens-rights": {
        "suffrage": "Discover Canada, p. 21, 'Women get the vote'",
        "macphail": "Discover Canada, p. 21, 'Women get the vote'"
    },
    
    // Modern Canada
    "modern-canada": {
        "general": "Discover Canada, p. 23-26, 'Modern Canada'",
        "post-war": "Discover Canada, p. 24, 'Trade and economic growth'",
        "economic-growth": "Discover Canada, p. 24, 'Trade and economic growth'",
        "social-programs": "Discover Canada, p. 24, 'Trade and economic growth'",
        "health-care": "Discover Canada, p. 24, 'Trade and economic growth'",
        "pensions": "Discover Canada, p. 24, 'Trade and economic growth'",
        "international-relations": "Discover Canada, p. 24, 'International engagement'",
        "cold-war": "Discover Canada, p. 24, 'International engagement'",
        "nato": "Discover Canada, p. 24, 'International engagement'",
        "norad": "Discover Canada, p. 24, 'International engagement'",
        "un": "Discover Canada, p. 24, 'International engagement'",
        "peacekeeping": "Discover Canada, p. 24, 'International engagement'",
        "quebec-relations": "Discover Canada, p. 24-25, 'Canada and Quebec'",
        "quiet-revolution": "Discover Canada, p. 24, 'Canada and Quebec'",
        "bilingualism": "Discover Canada, p. 24-25, 'Canada and Quebec'",
        "official-languages": "Discover Canada, p. 24-25, 'Canada and Quebec'",
        "quebec-sovereignty": "Discover Canada, p. 25, 'Canada and Quebec'",
        "changing-society": "Discover Canada, p. 25, 'A Changing Society'",
        "multiculturalism": "Discover Canada, p. 25, 'A Changing Society'",
        "voting-rights": "Discover Canada, p. 25, 'A Changing Society'",
        "arts-culture": "Discover Canada, p. 25-26, 'Arts and culture in Canada'",
        "literature": "Discover Canada, p. 25, 'Arts and culture in Canada'",
        "visual-arts": "Discover Canada, p. 25, 'Arts and culture in Canada'",
        "group-of-seven": "Discover Canada, p. 25, 'Arts and culture in Canada'",
        "performing-arts": "Discover Canada, p. 25, 'Arts and culture in Canada'",
        "sports": "Discover Canada, p. 26, 'Sports'",
        "hockey": "Discover Canada, p. 26, 'Sports'",
        "canadian-athletes": "Discover Canada, p. 26, 'Sports'",
        "terry-fox": "Discover Canada, p. 26, 'Sports'",
        "science-technology": "Discover Canada, p. 26",
        "inventions": "Discover Canada, p. 26, 'Great Canadian Discoveries and Inventions'"
    },
    
    // Canadian Government - updated with more detailed information
    "government": {
        "general": "Discover Canada, p. 28-30, 'How Canadians Govern Themselves'",
        "federal-state": "Discover Canada, p. 28, 'Federal state'",
        "parliamentary-democracy": "Discover Canada, p. 28-29, 'Parliamentary democracy'",
        "constitutional-monarchy": "Discover Canada, p. 29, 'Constitutional monarchy'",
        "levels-of-government": "Discover Canada, p. 28, 'Federal state'",
        "division-of-powers": "Discover Canada, p. 28, 'Federal state'",
        "making-laws": "Discover Canada, p. 29, 'Making laws'",
        "legislative-process": "Discover Canada, p. 29, 'How a bill becomes law'",
        "governor-general": "Discover Canada, p. 29, 'Constitutional monarchy'",
        "lieutenant-governor": "Discover Canada, p. 29, 'Constitutional monarchy'",
        "branches-of-government": "Discover Canada, p. 29-30, 'The interplay between the three branches of government'",
        "house-of-commons": "Discover Canada, p. 28, 'Parliamentary democracy'",
        "senate": "Discover Canada, p. 28, 'Parliamentary democracy'",
        "cabinet": "Discover Canada, p. 28, 'Parliamentary democracy'",
        "prime-minister": "Discover Canada, p. 28, 'Parliamentary democracy'",
        "premier": "Discover Canada, p. 29, 'Each provincial and territorial government'",
        
        // Territorial Government - new references
        "territorial-government": "Discover Canada, p. 35, 'Territorial Government'",
        "commissioner": "Discover Canada, p. 35, 'Territorial Government'",
        "premier": "Discover Canada, p. 35, 'Territorial Government'",
        "territorial-representatives": "Discover Canada, p. 35, 'Territorial Government'",
        "municipal-government": "Discover Canada, p. 35, 'Municipal Government'"
    },
    
    // Elections and Voting - new detailed section
    "elections": {
        "general": "Discover Canada, p. 30-32, 'Federal Elections'",
        "federal-elections": "Discover Canada, p. 30, 'Under legislation passed by Parliament'",
        "electoral-districts": "Discover Canada, p. 30, 'Canada is divided into 308 electoral districts'",
        "candidates": "Discover Canada, p. 30, 'Canadian citizens who are 18 years old or older may run'",
        "voting-eligibility": "Discover Canada, p. 30, 'Voting'",
        "voters-list": "Discover Canada, p. 30, 'The voters' lists'",
        "secret-ballot": "Discover Canada, p. 30, 'Secret ballot'",
        "elections-canada": "Discover Canada, p. 30, 'Elections Canada'",
        "voting-procedures": "Discover Canada, p. 31-32, 'Voting procedures during an election period'",
        "voter-information-card": "Discover Canada, p. 32, '1. Voter information card'",
        "advance-polls": "Discover Canada, p. 32, '3. Advance poll and special ballot'",
        "marking-ballot": "Discover Canada, p. 32, '5. Marking the ballot'",
        "election-results": "Discover Canada, p. 32, '8. The election results'",
        "forming-government": "Discover Canada, p. 30-31, 'After an election'",
        "majority-government": "Discover Canada, p. 30, 'If the party in power holds at least half of the seats'",
        "minority-government": "Discover Canada, p. 30, 'If the party in power holds less than half of the seats'",
        "confidence-votes": "Discover Canada, p. 31, 'When the House of Commons votes on a major issue'",
        "opposition-parties": "Discover Canada, p. 31, 'The other parties that are not in power'"
    },
    
    // Different levels of government
    "levels-of-government": {
        "general": "Discover Canada, p. 33, 'Other levels of government in Canada'",
        "federal-responsibilities": "Discover Canada, p. 33, 'Government table'",
        "provincial-responsibilities": "Discover Canada, p. 33, 'Government table'",
        "municipal-government": "Discover Canada, p. 33, 'Local or municipal government'",
        "municipal-responsibilities": "Discover Canada, p. 33, 'Municipalities are normally responsible for'",
        "first-nations-government": "Discover Canada, p. 33, 'The First Nations have band chiefs'",
        "provincial-elections": "Discover Canada, p. 33, 'Provincial, territorial and municipal elections'"
    },
    
    // Justice System - new section
    "justice-system": {
        "general": "Discover Canada, p. 36-37, 'The Justice System'",
        "core-principles": "Discover Canada, p. 36, 'The Canadian justice system guarantees everyone due process'",
        "rule-of-law": "Discover Canada, p. 36, 'Canada's legal system is based on a heritage'",
        "due-process": "Discover Canada, p. 36, 'Due process is the principle'",
        "laws": "Discover Canada, p. 36, 'Canada is governed by an organized system of laws'",
        "courts": "Discover Canada, p. 37, 'Courts'",
        "supreme-court": "Discover Canada, p. 37, 'The Supreme Court of Canada'",
        "federal-court": "Discover Canada, p. 37, 'The Federal Court of Canada'",
        "provincial-courts": "Discover Canada, p. 37, 'In most provinces there is an appeal court'",
        "police": "Discover Canada, p. 37, 'Police'",
        "rcmp": "Discover Canada, p. 37, 'The Royal Canadian Mounted Police (RCMP)'",
        "provincial-police": "Discover Canada, p. 37, 'There are provincial police forces in Ontario and Quebec'",
        "municipal-police": "Discover Canada, p. 37, 'municipal police departments in all provinces'",
        "legal-help": "Discover Canada, p. 37, 'Getting legal help'",
        "legal-aid": "Discover Canada, p. 37, 'legal aid services available free of charge or at a low cost'"
    },
    
    // Canadian Symbols - expanded with detailed references
    "symbols": {
        "general": "Discover Canada, p. 38-40, 'Canadian Symbols'",
        "crown": "Discover Canada, p. 38, 'The Canadian Crown'",
        "canadian-flag": "Discover Canada, p. 38, 'Flags in Canada'",
        "union-jack": "Discover Canada, p. 38, 'Flags in Canada'",
        "red-ensign": "Discover Canada, p. 38, 'Flags in Canada'",
        "maple-leaf": "Discover Canada, p. 38, 'The maple leaf'",
        "fleur-de-lys": "Discover Canada, p. 38, 'The fleur-de-lys'",
        "coat-of-arms": "Discover Canada, p. 38-39, 'Coat of arms and motto'",
        "motto": "Discover Canada, p. 38, 'Coat of arms and motto'",
        "parliament-buildings": "Discover Canada, p. 38-39, 'Parliament buildings'",
        "popular-sports": "Discover Canada, p. 39, 'Popular sports'",
        "hockey": "Discover Canada, p. 39, 'Popular sports'",
        "stanley-cup": "Discover Canada, p. 39, 'Popular sports'",
        "beaver": "Discover Canada, p. 39, 'The beaver'",
        "official-languages": "Discover Canada, p. 39-40, 'Canada's official languages'",
        "national-anthem": "Discover Canada, p. 40, 'National Anthem'",
        "royal-anthem": "Discover Canada, p. 40, 'Royal Anthem'",
        "order-of-canada": "Discover Canada, p. 40, 'The Order of Canada and other honours'",
        "victoria-cross": "Discover Canada, p. 40-41, 'The Victoria Cross'"
    },
    
    // National Public Holidays - new section
    "holidays": {
        "general": "Discover Canada, p. 41, 'National Public Holidays and Other Important Dates'",
        "new-years-day": "Discover Canada, p. 41, 'New Year's Day'",
        "macdonald-day": "Discover Canada, p. 41, 'Sir John A. Macdonald Day'",
        "good-friday": "Discover Canada, p. 41, 'Good Friday'",
        "easter-monday": "Discover Canada, p. 41, 'Easter Monday'",
        "vimy-day": "Discover Canada, p. 41, 'Vimy Day'",
        "victoria-day": "Discover Canada, p. 41, 'Victoria Day'",
        "fete-nationale": "Discover Canada, p. 41, 'Fête nationale (Quebec)'",
        "canada-day": "Discover Canada, p. 41, 'Canada Day'",
        "labour-day": "Discover Canada, p. 41, 'Labour Day'",
        "thanksgiving": "Discover Canada, p. 41, 'Thanksgiving Day'",
        "remembrance-day": "Discover Canada, p. 41, 'Remembrance Day'",
        "laurier-day": "Discover Canada, p. 41, 'Sir Wilfrid Laurier Day'",
        "christmas": "Discover Canada, p. 41, 'Christmas Day'",
        "boxing-day": "Discover Canada, p. 41, 'Boxing Day'"
    },
    
    // Canada's Economy - new section
    "economy": {
        "general": "Discover Canada, p. 42-43, 'Canada's Economy'",
        "trading-nation": "Discover Canada, p. 42, 'A trading nation'",
        "nafta": "Discover Canada, p. 42, 'North American Free Trade Agreement (NAFTA)'",
        "g8": "Discover Canada, p. 42, 'G8 group of leading industrialized countries'",
        "service-industries": "Discover Canada, p. 42, 'Service industries'",
        "manufacturing": "Discover Canada, p. 42, 'Manufacturing industries'",
        "natural-resources": "Discover Canada, p. 42, 'Natural resources industries'",
        "us-relations": "Discover Canada, p. 43, 'Canada enjoys close relations with the United States'",
        "exports": "Discover Canada, p. 43, 'Canada exports billions of dollars worth of energy products'",
        "peace-arch": "Discover Canada, p. 43, 'At Blaine in the State of Washington, the Peace Arch'"
    },
    
    // Canada's Regions - expanded with all provinces and territories
    "regions": {
        "general": "Discover Canada, p. 43-51, 'Canada's Regions'",
        "size": "Discover Canada, p. 43, 'Canada is the second largest country on earth'",
        "five-regions": "Discover Canada, p. 44, 'The Regions of Canada'",
        "national-capital": "Discover Canada, p. 44, 'The National Capital'",
        "provinces-territories": "Discover Canada, p. 44, 'Provinces and Territories'",
        "population": "Discover Canada, p. 44, 'Population'"
    },
    
    // Atlantic Provinces
    "atlantic-provinces": {
        "general": "Discover Canada, p. 45-46, 'The Atlantic provinces'",
        "newfoundland-labrador": "Discover Canada, p. 45, 'Newfoundland and Labrador'",
        "prince-edward-island": "Discover Canada, p. 45, 'Prince Edward Island'",
        "nova-scotia": "Discover Canada, p. 45, 'Nova Scotia'",
        "new-brunswick": "Discover Canada, p. 46, 'New Brunswick'"
    },
    
    // Central Canada
    "central-canada": {
        "general": "Discover Canada, p. 46-47, 'Central Canada'",
        "quebec": "Discover Canada, p. 46, 'Quebec'",
        "ontario": "Discover Canada, p. 47, 'Ontario'"
    },
    
    // Prairie Provinces - new section
    "prairie-provinces": {
        "general": "Discover Canada, p. 47-48, 'The Prairie Provinces'",
        "manitoba": "Discover Canada, p. 47, 'Manitoba'",
        "saskatchewan": "Discover Canada, p. 47-48, 'Saskatchewan'",
        "alberta": "Discover Canada, p. 48, 'Alberta'"
    },
    
    // West Coast - new section
    "west-coast": {
        "general": "Discover Canada, p. 48-49, 'The West Coast'",
        "british-columbia": "Discover Canada, p. 49, 'British Columbia'"
    },
    
    // Northern Territories - new section
    "northern-territories": {
        "general": "Discover Canada, p. 49-51, 'The Northern Territories'",
        "northwest-territories": "Discover Canada, p. 49, 'Northwest Territories'",
        "yukon": "Discover Canada, p. 49-50, 'Yukon'",
        "nunavut": "Discover Canada, p. 50-51, 'Nunavut'",
        "canadian-rangers": "Discover Canada, p. 51, 'The Canadian Rangers'"
    },
    
    // Provincial and territorial capitals
    "capitals": {
        "general": "Discover Canada, p. 44, 'Provinces and Territories'",
        "ottawa": "Discover Canada, p. 44, 'The National Capital'",
        "st-johns": "Discover Canada, p. 44, 'Capital City table'",
        "charlottetown": "Discover Canada, p. 44, 'Capital City table'",
        "halifax": "Discover Canada, p. 44, 'Capital City table'",
        "fredericton": "Discover Canada, p. 44, 'Capital City table'",
        "quebec-city": "Discover Canada, p. 44, 'Capital City table'",
        "toronto": "Discover Canada, p. 44, 'Capital City table'",
        "winnipeg": "Discover Canada, p. 44, 'Capital City table'",
        "regina": "Discover Canada, p. 44, 'Capital City table'",
        "edmonton": "Discover Canada, p. 44, 'Capital City table'",
        "victoria": "Discover Canada, p. 44, 'Capital City table'",
        "iqaluit": "Discover Canada, p. 44, 'Capital City table'",
        "yellowknife": "Discover Canada, p. 44, 'Capital City table'",
        "whitehorse": "Discover Canada, p. 44, 'Capital City table'"
    },
    
    // Individual provinces and territories - new detailed section
    "provinces-territories": {
        "ontario": "Discover Canada, p. 47, 'Ontario'",
        "quebec": "Discover Canada, p. 46, 'Quebec'",
        "manitoba": "Discover Canada, p. 47, 'Manitoba'",
        "saskatchewan": "Discover Canada, p. 47-48, 'Saskatchewan'",
        "alberta": "Discover Canada, p. 48, 'Alberta'",
        "british-columbia": "Discover Canada, p. 49, 'British Columbia'",
        "newfoundland-labrador": "Discover Canada, p. 45, 'Newfoundland and Labrador'",
        "prince-edward-island": "Discover Canada, p. 45, 'Prince Edward Island'",
        "nova-scotia": "Discover Canada, p. 45, 'Nova Scotia'",
        "new-brunswick": "Discover Canada, p. 46, 'New Brunswick'",
        "northwest-territories": "Discover Canada, p. 49, 'Northwest Territories'",
        "yukon": "Discover Canada, p. 49-50, 'Yukon'",
        "nunavut": "Discover Canada, p. 50-51, 'Nunavut'"
    },
    
    // Citizenship Test and Study Questions - new section
    "citizenship-test": {
        "general": "Discover Canada, p. 52-53, 'Study Questions'",
        "practice-questions": "Discover Canada, p. 52, 'The questions below are similar to the questions that are found on the citizenship test'",
        "other-study-questions": "Discover Canada, p. 53, 'Other study questions'"
    },
    
    // Additional Resources - new section
    "resources": {
        "general": "Discover Canada, p. 54-56, 'For More Information'",
        "citizenship-application": "Discover Canada, p. 54, 'Canadian Citizenship'",
        "citizenship-classes": "Discover Canada, p. 54, 'Citizenship classes'",
        "canada-resources": "Discover Canada, p. 54, 'Canada'",
        "federal-programs": "Discover Canada, p. 54, 'Federal Programs and Services'",
        "websites": "Discover Canada, p. 55-56, 'Other websites of interest'"
    },
    
    // Authorities and Requirements - new section
    "authorities": {
        "citizenship-act": "Discover Canada, p. 64, 'Section 5 of the Citizenship Act'",
        "citizenship-regulations": "Discover Canada, p. 64, 'Section 15 of the Citizenship Regulations'",
        "knowledge-criteria": "Discover Canada, p. 64, 'KNOWLEDGE OF CANADA AND CITIZENSHIP CRITERIA'"
    },
    
    // Map older/incorrect references to the correct locations
    "corrections": {
        "Discover Canada, p. 38, 'Geography'": "Discover Canada, p. 10, 'Who We Are'",
        "Discover Canada, p. 39": "Discover Canada, p. 11, 'English and French'",
        "Discover Canada, p. 42, 'National Symbols'": "Discover Canada, p. 38, 'Symbols of Canada'"
    }
};

/**
 * Corrects page references to match the current Discover Canada guide
 * @param {string} reference - The original reference string
 * @return {string} The corrected reference
 */
function correctReference(reference) {
    if (!reference) return "";
    
    // Check for direct corrections
    if (referenceMap.corrections[reference]) {
        return referenceMap.corrections[reference];
    }
    
    // Return original if no correction needed
    return reference;
}
