export const checklistCategories = [
    {
        id: 'emergency',
        title: 'Emergency Access',
        description: 'Ensure you have backup access methods to prevent lockout.',
        icon: 'AlertTriangle',
        items: [
            {
                id: 'break-glass',
                text: 'Create 2 emergency access accounts (Break-glass)',
                description: 'Exempt from MFA and Conditional Access policies to prevent lockout during service outages.',
                recommendation: 'To prevent lockout if MFA/SSO fails.',
                actionRequired: true,
            },
            {
                id: 'break-glass-monitor',
                text: 'Monitor Break-glass account sign-ins',
                description: 'Set up alerts in Azure Monitor or Sentinel for any sign-in activity from break-glass accounts. Any use should trigger immediate investigation.',
                recommendation: 'Any use of break-glass should trigger immediate investigation.',
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
                text: 'Limit Global Admins to fewer than 5 users',
                description: 'Global Admin role is the highest privilege. Keep the number low to reduce attack surface. Use least-privilege roles instead.',
                recommendation: 'Reduce attack surface for the highest privilege.',
                actionRequired: true,
            },
            {
                id: 'pim',
                text: 'Use PIM for all administrative roles',
                description: 'Enable Privileged Identity Management (PIM) to enforce Just-in-Time access for all admin roles. Remove permanent role assignments.',
                recommendation: 'Implement "Just-in-Time" access principle.',
                actionRequired: true,
            },
            {
                id: 'admin-separate-accounts',
                text: 'Admins use separate cloud-only accounts',
                description: 'Administrative tasks should use dedicated cloud-only accounts, not synchronized or personal accounts. Naming convention: admin_username@tenant.onmicrosoft.com.',
                recommendation: 'Isolate admin credentials from daily-use accounts.',
                actionRequired: true,
            },
            {
                id: 'fido2-admins',
                text: 'Enforce FIDO2 / Passkey for all admins',
                description: 'Require phishing-resistant MFA (FIDO2 security keys or Passkeys) for all privileged accounts via Conditional Access.',
                recommendation: 'Protect against AiTM (Adversary-in-the-Middle) phishing attacks.',
                actionRequired: true,
            },
            {
                id: 'saw',
                text: 'Deploy Secure Admin Workstations (SAW)',
                description: 'Privileged admin tasks should only be performed from hardened, dedicated workstations that are managed by Intune and separate from daily-use devices.',
                recommendation: 'Prevent credential theft from compromised endpoints.',
                actionRequired: false,
            }
        ]
    },
    {
        id: 'mfa',
        title: 'MFA & Authentication',
        description: 'Enforce strong authentication across all users.',
        icon: 'ShieldAlert',
        items: [
            {
                id: 'mfa-all-users',
                text: 'Require MFA for all users via Conditional Access',
                description: 'Enforce MFA for every user using a Conditional Access policy targeting all users and all cloud apps. Do not rely on Security Defaults.',
                recommendation: 'MFA blocks 99.9% of automated credential attacks.',
                actionRequired: true,
            },
            {
                id: 'disable-legacy-auth',
                text: 'Block legacy authentication protocols',
                description: 'Create a Conditional Access policy to block all legacy auth (SMTP, IMAP, POP3, Basic Auth). These protocols bypass MFA entirely.',
                recommendation: 'Legacy auth is used in over 99% of password spray attacks.',
                actionRequired: true,
            },
            {
                id: 'sspr',
                text: 'Enable Self-Service Password Reset (SSPR)',
                description: 'Configure SSPR with at least 2 authentication methods so users can reset their own passwords securely without helpdesk involvement.',
                recommendation: 'Reduce helpdesk load and improve user experience.',
                actionRequired: false,
            },
            {
                id: 'combined-registration',
                text: 'Enable combined security info registration',
                description: 'Enable the combined MFA and SSPR registration experience for a streamlined, unified user onboarding flow.',
                recommendation: 'Unified registration reduces user confusion and support tickets.',
                actionRequired: false,
            }
        ]
    },
    {
        id: 'conditional-access',
        title: 'Conditional Access',
        description: 'Implement Zero Trust access policies.',
        icon: 'Activity',
        items: [
            {
                id: 'ca-compliant-devices',
                text: 'Require compliant or hybrid-joined devices',
                description: 'CA policy to require Intune-compliant or Hybrid Azure AD joined devices for accessing corporate resources from all platforms.',
                recommendation: 'Ensure only managed devices can access sensitive data.',
                actionRequired: true,
            },
            {
                id: 'ca-risky-users',
                text: 'Block high-risk users (Entra ID Protection)',
                description: 'Configure CA policies to block or require password change for high-risk users and sign-ins detected by Entra ID Protection.',
                recommendation: 'Automate response to compromised account signals.',
                actionRequired: true,
            },
            {
                id: 'ca-named-locations',
                text: 'Define Trusted Named Locations',
                description: 'Configure named locations for trusted IP ranges (office networks, VPN) to reduce unnecessary MFA prompts and enable location-based access controls.',
                recommendation: 'Improves user experience while maintaining Zero Trust security.',
                actionRequired: false,
            },
            {
                id: 'ca-report-only',
                text: 'Test all new CA policies in Report-Only mode',
                description: 'Before enforcing any new Conditional Access policy, deploy it in report-only mode to assess the impact on users and prevent accidental lockouts.',
                recommendation: 'Prevents accidental lockouts from misconfigured policies.',
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
                text: 'Stream Entra ID Logs to Log Analytics',
                description: 'Stream sign-in and audit logs to Azure Monitor Log Analytics Workspace or a SIEM solution for 90+ day retention.',
                recommendation: 'Required for long-term auditing, compliance, and threat hunting.',
                actionRequired: true,
            },
            {
                id: 'sentinel',
                text: 'Enable Microsoft Sentinel with Entra connector',
                description: 'Connect Entra ID to Microsoft Sentinel and enable built-in analytic rules for identity-based threats (impossible travel, token theft, etc.).',
                recommendation: 'Centralized SIEM/SOAR for automated identity threat detection.',
                actionRequired: false,
            },
            {
                id: 'pim-alerts',
                text: 'Configure PIM alerts for role activations',
                description: 'Enable PIM email and portal notifications for role activations, especially for Global Admin, Privileged Role Admin, and other Tier-0 roles.',
                recommendation: 'Immediate visibility into all privileged access usage.',
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
                description: 'Scan for expired secrets, certificates, and unused app registrations with broad API permissions (e.g., Mail.Read, Directory.ReadWrite.All).',
                recommendation: 'Prevent exploitation of expired or overly-permissive application credentials.',
                actionRequired: true,
            },
            {
                id: 'guest-access',
                text: 'Restrict Guest user default permissions',
                description: 'Configure Guest user access restrictions to limit what external (B2B) users can enumerate in your tenant directory.',
                recommendation: 'Minimize data exposure to external identities.',
                actionRequired: true,
            },
            {
                id: 'app-consent',
                text: 'Disable user consent, require admin approval',
                description: 'Restrict application consent to admins only. Enable the admin consent workflow so users can request app access without granting it directly.',
                recommendation: 'Prevent OAuth phishing / illicit consent grant attacks.',
                actionRequired: true,
            },
            {
                id: 'stale-accounts',
                text: 'Review and disable stale user accounts',
                description: 'Identify accounts with no sign-in activity for 90+ days using Entra ID Access Reviews or a Log Analytics query, then disable or remove them.',
                recommendation: 'Reduce attack surface from orphaned and unmonitored accounts.',
                actionRequired: false,
            },
            {
                id: 'group-analyzer',
                text: 'Run Microsoft Cloud Group Analyzer',
                description: 'Use the open-source Group Analyzer tool to map where Entra ID groups are referenced (CA Policies, Intune, App Roles) before modifying or deleting them.',
                recommendation: 'Prevent service outages when modifying groups used in critical policies.',
                actionRequired: false,
            }
        ]
    }
];
