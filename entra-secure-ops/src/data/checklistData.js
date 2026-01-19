export const checklistCategories = [
    {
        id: 'emergency',
        title: 'Emergency Access',
        description: 'Ensure you have backup access methods to prevent lockout.',
        icon: 'AlertTriangle', // Lucide icon name
        items: [
            {
                id: 'break-glass',
                text: 'Create 2 emergency access accounts (Break-glass)',
                description: 'Exempt from MFA and Conditional Access policies to prevent lockout during service outages.',
                recommendation: 'To prevent lockout if MFA/SSO fails.',
                actionRequired: true,
            }
        ]
    },
    {
        id: 'privileged',
        title: 'Privileged Access',
        description: 'Secure your highest privilege accounts.',
        icon: 'ShieldAlert',
        items: [
            {
                id: 'global-admins',
                text: 'Limit Global Admins to < 5 users',
                description: 'Global Admin role is the highest privilege. Keep the number low to reduce attack surface.',
                recommendation: 'Reduce attack surface for the highest privilege.',
                actionRequired: true,
            },
            {
                id: 'pim',
                text: 'Use PIM for all administrative roles',
                description: 'Enable Privileged Identity Management (PIM) to enforce Just-in-Time access.',
                recommendation: 'Implement "Just-in-Time" access principle.',
                actionRequired: true,
            }
        ]
    },
    {
        id: 'monitoring',
        title: 'Monitoring & Logging',
        description: 'Visibility into your identity infrastructure.',
        icon: 'Activity',
        items: [
            {
                id: 'log-analytics',
                text: 'Connect Entra ID Logs to Log Analytics',
                description: 'Stream sign-in and audit logs to Azure Monitor or a SIEM.',
                recommendation: 'For long-term auditing and threat hunting.',
                actionRequired: true,
            }
        ]
    },
    {
        id: 'operations',
        title: 'Operational Health',
        description: 'Maintain hygiene of your identity objects.',
        icon: 'Settings',
        items: [
            {
                id: 'service-principals',
                text: 'Review Service Principal credentials',
                description: 'Scan for expired secrets and unused applications.',
                recommendation: 'Prevent use of expired or overly-permissive keys.',
                actionRequired: true,
            }
        ]
    }
];
