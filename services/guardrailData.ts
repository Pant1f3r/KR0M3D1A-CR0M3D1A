// A central repository for all guardrail-related data to ensure consistency.

export const availableCategories = [
    // Core Safety
    'Hate Speech', 'Harassment', 'Encouragement of Violence', 'Self Harm', 'Explicit Content', 'Non-Consensual Intimate Imagery',
    // Illegal & Regulated
    'Illegal Activities', 'Financial Crime & Fraud', 'Scams & Deceptive Practices', 'Terrorism & Violent Extremism', 'Regulated & Illicit Goods',
    // Misinfo & Deception
    'Misinformation (Health)', 'Misinformation (Political)', 'Influence & Propaganda Operations',
    // Cybersecurity & Privacy
    'Cybersecurity Threats', 'Malware Generation', 'Social Engineering Attacks', 'Credential Theft & Phishing', 'Privacy Violation & Doxxing', 'Biometric Data Exploitation', 'Deepfake Generation',
    // Misuse
    'Intellectual Property Theft', 'Academic Dishonesty', 'Unauthorized Legal Advice', 'Unauthorized Medical Advice', 'Jailbreak Attempts', 'Subtext & Inferential Threats',
    // KR0M3D1A Specific
    'Paranormal Digital Activity', 'Vocal Subterfuge', 'Guardrail Resiliency',
    // Catch-all
    'Other'
];

// Comprehensive color mapping for different violation categories for distinct styling
export const categoryStyles: { [key: string]: { text: string; border: string; bg: string; } } = {
  // Core Safety
  'Hate Speech': { text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-500/50', bg: 'bg-red-100 dark:bg-red-900/20' },
  'Harassment': { text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-500/50', bg: 'bg-rose-100 dark:bg-rose-900/20' },
  'Encouragement of Violence': { text: 'text-red-800 dark:text-red-300', border: 'border-red-300 dark:border-red-600/50', bg: 'bg-red-200 dark:bg-red-900/30' },
  'Self Harm': { text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-500/50', bg: 'bg-orange-100 dark:bg-orange-900/20' },
  'Explicit Content': { text: 'text-pink-700 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-500/50', bg: 'bg-pink-100 dark:bg-pink-900/20' },
  'Non-Consensual Intimate Imagery': { text: 'text-fuchsia-700 dark:text-fuchsia-400', border: 'border-fuchsia-200 dark:border-fuchsia-500/50', bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/20' },
  // Illegal & Regulated
  'Illegal Activities': { text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-500/50', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
  'Financial Crime & Fraud': { text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/50', bg: 'bg-amber-100 dark:bg-amber-900/20' },
  'Scams & Deceptive Practices': { text: 'text-yellow-800 dark:text-yellow-300', border: 'border-yellow-300 dark:border-yellow-600/50', bg: 'bg-yellow-200 dark:bg-yellow-900/30' },
  'Terrorism & Violent Extremism': { text: 'text-red-900 dark:text-red-200', border: 'border-red-400 dark:border-red-700/50', bg: 'bg-red-300 dark:bg-red-900/40' },
  'Regulated & Illicit Goods': { text: 'text-orange-800 dark:text-orange-300', border: 'border-orange-300 dark:border-orange-600/50', bg: 'bg-orange-200 dark:bg-orange-900/30' },
  // Misinfo & Deception
  'Misinformation (Health)': { text: 'text-lime-700 dark:text-lime-400', border: 'border-lime-200 dark:border-lime-500/50', bg: 'bg-lime-100 dark:bg-lime-900/20' },
  'Misinformation (Political)': { text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-500/50', bg: 'bg-sky-100 dark:bg-sky-900/20' },
  'Influence & Propaganda Operations': { text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/50', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  // Cybersecurity & Privacy
  'Cybersecurity Threats': { text: 'text-teal-700 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-500/50', bg: 'bg-teal-100 dark:bg-teal-900/20' },
  'Malware Generation': { text: 'text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-600/50', bg: 'bg-cyan-200 dark:bg-cyan-900/30' },
  'Social Engineering Attacks': { text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-500/50', bg: 'bg-sky-100 dark:bg-sky-900/20' },
  'Credential Theft & Phishing': { text: 'text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-600/50', bg: 'bg-blue-200 dark:bg-blue-900/30' },
  'Privacy Violation & Doxxing': { text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/50', bg: 'bg-indigo-100 dark:bg-indigo-900/20' },
  'Biometric Data Exploitation': { text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/50', bg: 'bg-amber-100 dark:bg-amber-900/20' },
  'Deepfake Generation': { text: 'text-fuchsia-700 dark:text-fuchsia-400', border: 'border-fuchsia-200 dark:border-fuchsia-500/50', bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/20' },
  // Misuse
  'Intellectual Property Theft': { text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/50', bg: 'bg-emerald-100 dark:bg-emerald-900/20' },
  'Academic Dishonesty': { text: 'text-green-800 dark:text-green-300', border: 'border-green-300 dark:border-green-600/50', bg: 'bg-green-200 dark:bg-green-900/30' },
  'Unauthorized Legal Advice': { text: 'text-indigo-800 dark:text-indigo-300', border: 'border-indigo-300 dark:border-indigo-600/50', bg: 'bg-indigo-200 dark:bg-indigo-900/30' },
  'Unauthorized Medical Advice': { text: 'text-lime-800 dark:text-lime-300', border: 'border-lime-300 dark:border-lime-600/50', bg: 'bg-lime-200 dark:bg-lime-900/30' },
  'Jailbreak Attempts': { text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/50', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  'Subtext & Inferential Threats': { text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/50', bg: 'bg-indigo-100 dark:bg-indigo-900/20' },
  // KR0M3D1A Specific
  'Paranormal Digital Activity': { text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-400/50', bg: 'bg-slate-100 dark:bg-slate-800/20' },
  'Vocal Subterfuge': { text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/50', bg: 'bg-cyan-100 dark:bg-cyan-900/20' },
  'Guardrail Resiliency': { text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-400/50', bg: 'bg-slate-100 dark:bg-slate-800/20' },
  'Other': { text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-500/50', bg: 'bg-gray-100 dark:bg-gray-900/20' },
  'default': { text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-500/50', bg: 'bg-gray-100 dark:bg-gray-900/20' }
};

export const categoryInfo: { [key: string]: { description: string; policyLink: string; } } = {
  // Core Safety
  'Hate Speech': { description: "Content that promotes violence, incites hatred, or disparages on the basis of characteristics associated with systemic discrimination.", policyLink: "#policy-hate-speech" },
  'Harassment': { description: "Targeted attacks, bullying, or threatening behavior directed at individuals, including doxxing or encouraging others to harass someone.", policyLink: "#policy-harassment" },
  'Encouragement of Violence': { description: "Content that praises, promotes, or enables violent acts, including glorifying terrorists or criminal organizations.", policyLink: "#policy-violence" },
  'Self Harm': { description: "Content that encourages or provides instructions on how to self-harm or commit suicide. We prioritize user safety and provide resources for help.", policyLink: "#policy-self-harm" },
  'Explicit Content': { description: "Requests for sexually explicit material, pornography, or graphically violent content. Aims to maintain a safe and appropriate environment.", policyLink: "#policy-explicit-content" },
  'Non-Consensual Intimate Imagery': { description: "Blocks the generation or discussion of intimate images that were created or shared without the subject's consent.", policyLink: "#policy-ncii" },
  
  // Illegal & Regulated
  'Illegal Activities': { description: 'Promoting illegal acts or providing instructions on how to perform them, such as making bombs, theft, or creating weapons.', policyLink: '#policy-illegal' },
  'Financial Crime & Fraud': { description: 'Content related to financial crimes like money laundering, pyramid schemes, or fraudulent investment advice.', policyLink: '#policy-fraud' },
  'Scams & Deceptive Practices': { description: 'Generation of content intended to deceive or scam users, such as creating phishing emails or fake websites.', policyLink: '#policy-scams' },
  'Terrorism & Violent Extremism': { description: 'Content that supports or glorifies terrorist organizations, their actions, or extremist ideologies.', policyLink: '#policy-terrorism' },
  'Regulated & Illicit Goods': { description: 'Discussion or promotion of highly regulated or illegal goods, such as drugs, firearms, or counterfeit items.', policyLink: '#policy-regulated-goods' },
  
  // Misinfo & Deception
  'Misinformation (Health)': { description: 'Spreading medically inaccurate information that could cause harm, such as promoting unproven "cures" for diseases.', policyLink: '#policy-misinfo-health' },
  'Misinformation (Political)': { description: 'Creation or dissemination of false information intended to manipulate political processes, voter turnout, or public opinion.', policyLink: '#policy-misinfo-political' },
  'Influence & Propaganda Operations': { description: 'Use of the model to generate coordinated propaganda or automated influence campaigns.', policyLink: '#policy-propaganda' },
  
  // Cybersecurity & Privacy
  'Cybersecurity Threats': { description: 'Generation of malicious code, exploits, or techniques for compromising computer systems.', policyLink: '#policy-cybersecurity' },
  'Malware Generation': { description: 'Specifically creating viruses, ransomware, spyware, or other forms of malicious software.', policyLink: '#policy-malware' },
  'Social Engineering Attacks': { description: 'Crafting messages or scenarios designed to manipulate people into divulging confidential information or performing actions.', policyLink: '#policy-social-engineering' },
  'Credential Theft & Phishing': { description: 'Creating content for phishing attacks or other methods of stealing user credentials and sensitive data.', policyLink: '#policy-phishing' },
  'Privacy Violation & Doxxing': { description: 'Revealing private, identifying information about individuals without their consent (doxxing).', policyLink: '#policy-doxxing' },
  'Biometric Data Exploitation': { description: 'Misusing or attempting to generate or analyze biometric data for malicious purposes.', policyLink: '#policy-biometric' },
  'Deepfake Generation': { description: 'Creating synthetic media to impersonate or misrepresent individuals without consent, particularly in harmful or deceptive contexts.', policyLink: '#policy-deepfake' },
  
  // Misuse
  'Intellectual Property Theft': { description: 'Generating content that infringes on copyright, trademarks, or patents, or facilitates piracy.', policyLink: '#policy-ip' },
  'Academic Dishonesty': { description: 'Generating content intended for cheating, such as writing entire essays or solving exam questions for a user.', policyLink: '#policy-academic' },
  'Unauthorized Legal Advice': { description: 'Providing legal advice without being a qualified professional, which could lead to severe real-world harm.', policyLink: '#policy-legal-advice' },
  'Unauthorized Medical Advice': { description: 'Providing medical advice, diagnoses, or treatment plans, which should only be done by a qualified healthcare professional.', policyLink: '#policy-medical-advice' },
  'Jailbreak Attempts': { description: 'Prompts designed to bypass, ignore, or subvert the AI\'s safety instructions and foundational rules.', policyLink: '#policy-jailbreak' },
  'Subtext & Inferential Threats': { description: 'Detecting harmful intent hidden in subtext, coded language, or indirect prompts that attempt to circumvent direct policy violations.', policyLink: '#policy-subtext' },
  
  // KR0M3D1A Specific
  'Paranormal Digital Activity': { description: 'A KR0M3D1A-specific guardrail that detects "Sub-Semantic Payload Injection" (SSPI), where instructions are hidden in the sub-perceptual data stream of a prompt.', policyLink: '#policy-paranormal' },
  'Vocal Subterfuge': { description: 'A KR0M3D1A-specific guardrail that analyzes audio to distinguish between human and synthetic voices, preventing deepfake audio attacks.', policyLink: '#policy-vocal' },
  'Guardrail Resiliency': { description: 'Measures and protocols ensuring the guardrail system remains robust against adversarial attacks, novel jailbreak attempts, and unexpected inputs. This includes adaptive learning, redundancy, and fail-safe mechanisms to maintain system integrity under stress.', policyLink: '#policy-resiliency' },
  
  // Catch-all
  'Other': { description: 'A catch-all category for violations that do not fit into the other defined policies. Subject to review and categorization.', policyLink: '#policy-other' }
};
