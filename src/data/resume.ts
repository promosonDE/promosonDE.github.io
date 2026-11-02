/**
 * Single source of truth for everything résumé-related on the site.
 *
 * Every section reads from this file, so updating a role, skill or
 * certification automatically updates the hero, about, inventory, quest log,
 * achievements, contact panel and footer. Content is transcribed from
 * Promoson Poudel's master CV.
 */

export interface SkillGroup {
  /** Stable id used for React keys and deep links. */
  id: string
  /** Full display name. */
  name: string
  /** Compact name used in tight tab strips. */
  shortName: string
  icon: string
  color: string
  /** One-line explanation of how the toolkit is used. */
  summary: string
  skills: string[]
}

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  icon: string
  color: string
  level: string
  xp: string
  /** One-line outcome shown in the collapsed card. */
  headline: string
  summary: string
  achievements: string[]
  tech: string[]
}

export interface Certification {
  name: string
  shortName: string
  issuer: string
  icon: string
  color: string
  rarity: string
  rarityColor: string
  description: string
  focus: string[]
}

export interface ImpactMetric {
  value: string
  label: string
  description: string
  icon: string
  color: string
}

export interface Capability {
  title: string
  icon: string
  color: string
  description: string
  tools: string[]
}

export interface ArchitectureLayer {
  name: string
  subtitle: string
  icon: string
  color: string
  technologies: string[]
}

export const profile = {
  name: 'Promoson Poudel',
  firstName: 'Promoson',
  role: 'Senior Data Engineer',
  level: 'LVL 6+',
  years: '6+',
  tagline:
    'Architecting cloud-native lakehouse platforms, real-time pipelines, and AI-ready data products.',
  availability: 'Senior Data Engineer • Azure / AWS / GCP',
  email: 'Promosonpoudel440@gmail.com',
  phone: '469-587-9546',
  phoneHref: '+14695879546',
  linkedin: 'https://www.linkedin.com/in/promoson-poudel-5358ba1b5',
  linkedinLabel: 'linkedin.com/in/promoson-poudel-5358ba1b5',
  domains: ['Healthcare', 'Finance', 'Insurance', 'Retail'],
  clouds: ['Microsoft Azure', 'Amazon Web Services', 'Google Cloud Platform'],
  focusAreas: [
    'Cloud-Native Lakehouse Architecture',
    'Metadata-Driven ETL / ELT',
    'Batch & Real-Time Streaming',
    'Data Governance & Security',
    'Performance & Cost Optimization',
    'AI-Ready Data & RAG Enablement',
  ],
  summary: [
    'Accomplished and versatile Senior Data Engineer with 6+ years of experience architecting scalable, secure, and high-performance data platforms across healthcare, finance, insurance, and retail domains.',
    'Strong expertise in designing modern cloud-native Lakehouse Architecture, enterprise Data Warehouses, and analytics platforms using Azure Data Factory, Azure Databricks, Snowflake, Delta Lake, AWS Glue, Amazon S3, Amazon Redshift, GCP BigQuery, Dataflow, Pub/Sub, and Dataproc.',
    'Skilled in building metadata-driven ETL/ELT frameworks, batch and real-time streaming pipelines, data integration solutions, and optimized data models that improve scalability, governance, data quality, data lineage, and regulatory compliance aligned with HIPAA, GDPR, and enterprise security standards.',
    'Experienced in developing AI-ready data platforms and supporting Generative AI and RAG pipeline use cases by preparing curated, governed, and analytics-ready datasets for machine learning, vector search, semantic retrieval, advanced analytics, and executive reporting.',
    'Proficient in Python, SQL, PySpark, Apache Spark, Kafka, Airflow, dbt, Terraform, Git, Azure DevOps, CI/CD automation, API integrations, and cloud-native monitoring tools to deliver reliable production-grade data solutions.',
    'Adept at collaborating with data science, BI, DevOps, security, and business teams to deliver trusted datasets, Power BI and Tableau dashboards, machine learning workflows, and mission-critical decision-making solutions at enterprise scale.',
  ],
  quickFacts: [
    { label: 'Experience', value: '6+ years' },
    { label: 'Clouds', value: 'Azure • AWS • GCP' },
    { label: 'Industries', value: 'Healthcare • Finance • Insurance • Retail' },
    { label: 'Education', value: 'B.S. Information Systems, UT Arlington' },
    { label: 'Certifications', value: 'Databricks • Microsoft • Snowflake' },
    { label: 'Specialty', value: 'Lakehouse • Streaming • GenAI data' },
  ],
}

export const heroStats = [
  { value: '6+', label: 'Years experience', color: '#FCDB05' },
  { value: '3', label: 'Cloud platforms', color: '#4AEDD9' },
  { value: '4', label: 'Industries', color: '#17DD62' },
  { value: '120M+', label: 'Records / day', color: '#FF7B72' },
]

export const impactMetrics: ImpactMetric[] = [
  {
    value: '120M+',
    label: 'Claims records / day',
    description:
      'Unified claims, eligibility, provider, and clinical quality data on a healthcare lakehouse.',
    icon: '🏥',
    color: '#4AEDD9',
  },
  {
    value: '35%',
    label: 'Faster analytics readiness',
    description:
      'Standardized Bronze / Silver / Gold ingestion with Autoloader, PySpark, CDC, Delta Lake, and dbt.',
    icon: '⚡',
    color: '#FCDB05',
  },
  {
    value: '35–40%',
    label: 'Pipeline runtime reduction',
    description:
      'Tuned partitioning, shuffle management, caching, and Delta table design for large PySpark workloads.',
    icon: '🚀',
    color: '#17DD62',
  },
  {
    value: '25–30%',
    label: 'Warehouse spend saved',
    description:
      'Snowflake right-sizing, clustering, query profiling, materialized views, and secure data sharing.',
    icon: '❄️',
    color: '#7BA4D4',
  },
  {
    value: '40%',
    label: 'Fewer pipeline failures',
    description:
      'Dependency-aware triggers, retries, data quality gates, and SLA-based monitoring in production.',
    icon: '🛡️',
    color: '#FF7B72',
  },
  {
    value: '3',
    label: 'Cloud platforms',
    description:
      'Production delivery across Microsoft Azure, Amazon Web Services, and Google Cloud Platform.',
    icon: '☁️',
    color: '#CF4A1A',
  },
]

export const capabilities: Capability[] = [
  {
    title: 'Lakehouse Architecture',
    icon: '🏗️',
    color: '#4AEDD9',
    description:
      'Designs medallion lakehouses on ADLS Gen2, Delta Lake, and Databricks with governed Bronze, Silver, and Gold layers that scale from raw ingestion to curated analytics.',
    tools: ['Azure Databricks', 'Delta Lake', 'ADLS Gen2', 'Unity Catalog', 'dbt'],
  },
  {
    title: 'Metadata-Driven ETL / ELT',
    icon: '⚙️',
    color: '#17DD62',
    description:
      'Builds reusable, configuration-driven pipeline frameworks in Azure Data Factory, AWS Glue, Airflow, and dbt so new feeds ship without bespoke code.',
    tools: ['Azure Data Factory', 'AWS Glue', 'Apache Airflow', 'dbt', 'PySpark'],
  },
  {
    title: 'Real-Time Data Integration',
    icon: '📡',
    color: '#FCDB05',
    description:
      'Delivers event-driven and micro-batch pipelines with Kafka, Kinesis, Event Hubs, and Spark Structured Streaming for claims, fraud, and operational use cases.',
    tools: ['Apache Kafka', 'Amazon Kinesis', 'Azure Event Hubs', 'Pub/Sub', 'Structured Streaming'],
  },
  {
    title: 'Governance, Security & Compliance',
    icon: '🔒',
    color: '#FF7B72',
    description:
      'Protects PHI, PII, and regulated data with RBAC, managed identities, Key Vault, encryption, dynamic masking, lineage, and HIPAA / GDPR-aligned controls.',
    tools: ['Microsoft Purview', 'Unity Catalog', 'Lake Formation', 'RBAC', 'Key Vault'],
  },
  {
    title: 'Performance & Cost Engineering',
    icon: '📈',
    color: '#7BA4D4',
    description:
      'Diagnoses Spark and warehouse bottlenecks with query profiles, partitioning, clustering, and right-sizing to cut runtime and cloud spend without losing SLAs.',
    tools: ['PySpark tuning', 'Snowflake', 'Redshift', 'Synapse', 'BigQuery'],
  },
  {
    title: 'AI-Ready Data & GenAI',
    icon: '🤖',
    color: '#CF4A1A',
    description:
      'Prepares governed feature sets, embeddings, and semantic retrieval datasets that feed ML models, RAG pipelines, vector search, and executive analytics.',
    tools: ['Feature Store', 'RAG pipelines', 'Vector search', 'Embeddings', 'ML-ready datasets'],
  },
]

export const architectureLayers: ArchitectureLayer[] = [
  {
    name: 'Sources',
    subtitle: 'Business & partner data',
    icon: '📥',
    color: '#BC9862',
    technologies: [
      'Claims & eligibility',
      'Provider & clinical',
      'Policy, billing & underwriting',
      'POS, inventory & supply chain',
      'Partner feeds & REST APIs',
      'Event streams',
    ],
  },
  {
    name: 'Ingestion',
    subtitle: 'Batch, incremental & streaming',
    icon: '🔀',
    color: '#FCDB05',
    technologies: [
      'Azure Data Factory',
      'Databricks Autoloader',
      'AWS Glue',
      'Kafka / Kinesis / Event Hubs',
      'CDC & API ingestion',
      'Event Grid & Lambda',
    ],
  },
  {
    name: 'Lakehouse',
    subtitle: 'Bronze → Silver → Gold',
    icon: '🔷',
    color: '#4AEDD9',
    technologies: [
      'ADLS Gen2 & Amazon S3',
      'Delta Lake & Delta Live Tables',
      'PySpark transformations',
      'Schema enforcement & merges',
      'Unity Catalog',
      'Feature Store',
    ],
  },
  {
    name: 'Warehouse',
    subtitle: 'Modeled & semantic layer',
    icon: '❄️',
    color: '#7BA4D4',
    technologies: [
      'Snowflake',
      'Amazon Redshift',
      'Azure Synapse',
      'BigQuery',
      'dbt semantic marts',
      'Dimensional models',
    ],
  },
  {
    name: 'Consumption',
    subtitle: 'Analytics, AI & reporting',
    icon: '📊',
    color: '#17DD62',
    technologies: [
      'Power BI & Tableau',
      'Executive dashboards',
      'ML & risk scoring',
      'RAG & vector search',
      'Regulatory reporting',
      'Self-service analytics',
    ],
  },
]

export const architectureGuardrails = [
  'Data quality gates & reconciliation',
  'Lineage & cataloging',
  'RBAC, masking & encryption',
  'SLA monitoring & alerting',
  'HIPAA / GDPR alignment',
  'Cost & performance observability',
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'cloud',
    name: '☁️ Cloud Platforms & Services',
    shortName: 'Cloud',
    icon: '☁️',
    color: '#4AEDD9',
    summary: 'Hands-on delivery across all three major clouds.',
    skills: [
      'Azure Data Factory',
      'Azure Databricks',
      'Synapse Analytics',
      'ADLS Gen2',
      'Event Hubs',
      'Event Grid',
      'Azure Functions',
      'Azure SQL Database',
      'Blob Storage',
      'Azure Monitor',
      'Log Analytics',
      'Key Vault',
      'Managed Identity',
      'Microsoft Purview',
      'AWS Glue',
      'Amazon S3',
      'Amazon Redshift',
      'Lambda',
      'Kinesis',
      'EC2',
      'IAM',
      'CloudWatch',
      'Lake Formation',
      'Athena',
      'Step Functions',
      'EventBridge',
      'RDS',
      'DynamoDB',
      'GCP BigQuery',
      'Cloud Storage',
      'Pub/Sub',
      'Dataproc',
      'Dataflow',
      'Cloud Composer',
      'Cloud Functions',
      'Cloud IAM',
      'Cloud Logging',
      'Cloud Monitoring',
    ],
  },
  {
    id: 'warehousing',
    name: '🏛️ Data Warehousing',
    shortName: 'Warehousing',
    icon: '🏛️',
    color: '#FCDB05',
    summary: 'Enterprise warehouse design, modeling, and tuning.',
    skills: [
      'Snowflake',
      'Amazon Redshift',
      'Azure Synapse Analytics',
      'Google BigQuery',
      'SQL Server',
      'Oracle',
      'Teradata',
    ],
  },
  {
    id: 'snowflake',
    name: '❄️ Snowflake Features',
    shortName: 'Snowflake',
    icon: '❄️',
    color: '#7BA4D4',
    summary: 'Native Snowflake features for performance and governance.',
    skills: [
      'Streams',
      'Tasks',
      'External Tables',
      'Secure Data Sharing',
      'Dynamic Data Masking',
      'Zero Copy Cloning',
      'Time Travel',
      'Snowpipe',
      'Materialized Views',
      'Query Optimization',
    ],
  },
  {
    id: 'lakehouse',
    name: '🔷 Lakehouse Platforms',
    shortName: 'Lakehouse',
    icon: '🔷',
    color: '#4AEDD9',
    summary: 'Medallion lakehouse builds on Databricks and Delta Lake.',
    skills: [
      'Azure Databricks',
      'Delta Lake',
      'Delta Live Tables',
      'Databricks Workflows',
      'Unity Catalog',
      'Databricks Repos',
      'Feature Store',
      'Medallion Architecture',
      'Bronze / Silver / Gold',
    ],
  },
  {
    id: 'etl',
    name: '⚙️ ETL & ELT Tools',
    shortName: 'ETL / ELT',
    icon: '⚙️',
    color: '#17DD62',
    summary: 'Reusable ingestion and transformation frameworks.',
    skills: [
      'Azure Data Factory',
      'AWS Glue',
      'Apache Airflow',
      'MWAA',
      'dbt',
      'Informatica PowerCenter',
      'SSIS',
      'SQL-Based ELT',
      'CDC',
      'Autoloader',
      'Glue Workflows',
    ],
  },
  {
    id: 'orchestration',
    name: '🧭 Data Orchestration',
    shortName: 'Orchestration',
    icon: '🧭',
    color: '#FCDB05',
    summary: 'Dependency-aware scheduling across cloud services.',
    skills: [
      'Apache Airflow',
      'Azure Data Factory Pipelines',
      'Databricks Workflows',
      'AWS Step Functions',
      'EventBridge',
      'Azure Event Grid',
      'Cloud Composer',
    ],
  },
  {
    id: 'languages',
    name: '🐍 Programming Languages',
    shortName: 'Languages',
    icon: '🐍',
    color: '#17DD62',
    summary: 'Primary languages for data engineering and automation.',
    skills: [
      'Python',
      'SQL',
      'PySpark',
      'Spark SQL',
      'T-SQL',
      'PL/SQL',
      'Bash',
      'Shell Scripting',
      'Scala',
    ],
  },
  {
    id: 'big-data',
    name: '🔥 Big Data Processing',
    shortName: 'Big Data',
    icon: '🔥',
    color: '#CF4A1A',
    summary: 'Distributed processing at enterprise scale.',
    skills: [
      'Apache Spark',
      'PySpark',
      'Spark SQL',
      'Databricks',
      'Dataproc',
      'AWS Glue Spark',
      'EMR',
      'Distributed Processing',
      'Partitioning',
      'Caching',
      'Performance Tuning',
    ],
  },
  {
    id: 'streaming',
    name: '📡 Streaming & Real-Time',
    shortName: 'Streaming',
    icon: '📡',
    color: '#4AEDD9',
    summary: 'Event-driven pipelines with low-latency delivery.',
    skills: [
      'Apache Kafka',
      'Amazon Kinesis Data Streams',
      'Azure Event Hubs',
      'Google Pub/Sub',
      'Spark Structured Streaming',
      'Micro-Batch Processing',
      'Event-Driven Architecture',
    ],
  },
  {
    id: 'databases',
    name: '🗄️ Databases',
    shortName: 'Databases',
    icon: '🗄️',
    color: '#FCDB05',
    summary: 'Relational and NoSQL systems across the stack.',
    skills: [
      'PostgreSQL',
      'MySQL',
      'SQL Server',
      'Oracle',
      'Teradata',
      'MongoDB',
      'Redis',
      'DynamoDB',
      'Amazon RDS',
      'Azure SQL Database',
    ],
  },
  {
    id: 'modeling',
    name: '📐 Data Modeling',
    shortName: 'Modeling',
    icon: '📐',
    color: '#17DD62',
    summary: 'Dimensional models built for analytics and history.',
    skills: [
      'Dimensional Modeling',
      'Star Schema',
      'Snowflake Schema',
      'SCD Type 2',
      'Slowly Changing Dimensions',
      'Data Vault Basics',
      'Fact & Dimension Tables',
      'Schema Evolution',
    ],
  },
  {
    id: 'architecture',
    name: '🏗️ Data Architecture',
    shortName: 'Architecture',
    icon: '🏗️',
    color: '#4AEDD9',
    summary: 'Patterns that keep platforms scalable and reusable.',
    skills: [
      'Lakehouse Architecture',
      'Delta Architecture',
      'Medallion Architecture',
      'Data Lake',
      'Enterprise Data Warehouse',
      'Metadata-Driven Design',
      'Reusable Pipeline Frameworks',
    ],
  },
  {
    id: 'governance',
    name: '🔒 Data Governance & Security',
    shortName: 'Governance',
    icon: '🔒',
    color: '#FF7B72',
    summary: 'Compliance-first controls for sensitive data.',
    skills: [
      'Microsoft Purview',
      'Unity Catalog',
      'AWS Lake Formation',
      'Data Cataloging',
      'Data Lineage',
      'RBAC',
      'IAM Policies',
      'PII Protection',
      'Encryption',
      'Dynamic Masking',
      'Secure Data Sharing',
    ],
  },
  {
    id: 'quality',
    name: '✅ Data Quality & Validation',
    shortName: 'Data Quality',
    icon: '✅',
    color: '#17DD62',
    summary: 'Trustworthy data through automated validation.',
    skills: [
      'Great Expectations',
      'Data Profiling',
      'Data Reconciliation',
      'Schema Validation',
      'SLA Monitoring',
      'Exception Handling',
      'Audit Logging',
      'Data Quality Rules',
    ],
  },
  {
    id: 'devops',
    name: '🚀 DevOps & CI/CD',
    shortName: 'DevOps',
    icon: '🚀',
    color: '#4AEDD9',
    summary: 'Repeatable, versioned releases for data platforms.',
    skills: [
      'Azure DevOps Pipelines',
      'GitHub Actions',
      'Git',
      'Databricks Repos',
      'CI/CD Automation',
      'Release Management',
      'Version Control',
      'Deployment Automation',
    ],
  },
  {
    id: 'iac',
    name: '🧱 Infrastructure as Code',
    shortName: 'IaC',
    icon: '🧱',
    color: '#BC9862',
    summary: 'Provisioned environments with reusable modules.',
    skills: [
      'Terraform',
      'IAM / RBAC Policies',
      'Cloud Resource Provisioning',
      'Environment Configuration',
      'Reusable Infrastructure Modules',
    ],
  },
  {
    id: 'observability',
    name: '📈 Monitoring & Observability',
    shortName: 'Monitoring',
    icon: '📈',
    color: '#FCDB05',
    summary: 'Production visibility, alerting, and SLA tracking.',
    skills: [
      'Azure Monitor',
      'Log Analytics',
      'AWS CloudWatch',
      'Cloud Logging',
      'Cloud Monitoring',
      'Databricks Jobs Monitoring',
      'SLA Alerts',
      'Custom Dashboards',
    ],
  },
  {
    id: 'ai',
    name: '🤖 AI, ML & GenAI Data Support',
    shortName: 'AI / ML',
    icon: '🤖',
    color: '#CF4A1A',
    summary: 'Governed datasets that power models and RAG.',
    skills: [
      'Feature Engineering Pipelines',
      'Feature Store',
      'RAG Pipelines',
      'Vector Search',
      'Semantic Retrieval',
      'Embeddings Data Preparation',
      'ML-Ready Datasets',
      'Model Input Pipelines',
    ],
  },
  {
    id: 'bi',
    name: '📊 BI & Reporting',
    shortName: 'BI',
    icon: '📊',
    color: '#17DD62',
    summary: 'Decision-ready dashboards and self-service marts.',
    skills: [
      'Power BI',
      'Tableau',
      'Looker Studio',
      'Excel',
      'Executive Dashboards',
      'KPI Reporting',
      'Self-Service Analytics',
    ],
  },
  {
    id: 'apis',
    name: '🔌 APIs & Data Integration',
    shortName: 'APIs',
    icon: '🔌',
    color: '#FCDB05',
    summary: 'Batch and real-time integration across systems.',
    skills: [
      'REST APIs',
      'JSON Parsing',
      'XML Parsing',
      'API-Based Ingestion',
      'File-Based Ingestion',
      'Batch Integration',
      'Real-Time Integration',
    ],
  },
  {
    id: 'formats',
    name: '📦 File Formats',
    shortName: 'File Formats',
    icon: '📦',
    color: '#BC9862',
    summary: 'Efficient storage formats for every layer.',
    skills: ['Parquet', 'Avro', 'ORC', 'CSV', 'JSON', 'XML', 'Delta Format'],
  },
  {
    id: 'platform-tools',
    name: '🖥️ Operating Systems & Tools',
    shortName: 'Platform',
    icon: '🖥️',
    color: '#7F7F7F',
    summary: 'Everyday environment and delivery tooling.',
    skills: [
      'Linux',
      'Unix',
      'Windows',
      'Jira',
      'Confluence',
      'Agile Scrum',
      'ServiceNow',
    ],
  },
]

/** Flat list used by the searchable inventory. */
export const allSkills = Array.from(
  new Set(skillGroups.flatMap((group) => group.skills))
).sort((a, b) => a.localeCompare(b))

export const experiences: Experience[] = [
  {
    title: 'Senior Data Engineer',
    company: 'Elevance Health',
    location: 'Indianapolis, IN',
    period: 'May 2024 – Present',
    icon: '🏥',
    color: '#4AEDD9',
    level: 'LVL 6',
    xp: '100%',
    headline: '120M+ claims records processed daily',
    summary:
      "Enterprise Healthcare Data Modernization team, designing a scalable healthcare lakehouse platform that unifies claims, eligibility, provider, and clinical quality datasets.",
    achievements: [
      "Served on Elevance Health's Enterprise Healthcare Data Modernization team, designing a scalable healthcare lakehouse platform using Azure Data Lake Gen2, Azure Databricks, Delta Lake, and Snowflake to unify claims, eligibility, provider, and clinical quality datasets supporting 120M+ claims records daily.",
      'Re-engineered fragmented ingestion workflows into a standardized Bronze, Silver, and Gold architecture using Databricks Autoloader, PySpark, CDC, Delta Lake, and dbt, improving data freshness and analytics readiness by 35%.',
      'Built reusable metadata-driven ETL/ELT pipelines in Azure Data Factory and Azure Databricks to support batch, incremental, and partner data feeds with improved scalability and operational consistency.',
      'Designed secure data architecture for PHI, PII, and healthcare-sensitive workloads by implementing RBAC, Managed Identities, Azure Key Vault, encryption, masking policies, and access controls aligned with HIPAA standards.',
      'Optimized large-scale PySpark workloads in Azure Databricks by improving partitioning, shuffle management, caching, and Delta table design, reducing pipeline runtime by 35–40% and improving compute efficiency.',
      'Enhanced Snowflake performance and cost governance through warehouse right-sizing, clustering, query profile analysis, materialized views, secure data sharing, row-level security, and dynamic masking, reducing annual warehouse spend by 25–30%.',
      'Partnered with clinical quality, risk adjustment, actuarial, finance, and BI teams to deliver curated datasets for HEDIS, RAF scoring, regulatory reporting, executive dashboards, and operational analytics.',
      'Developed semantic marts and dimensional data models using dbt, SQL, Snowflake, and Delta Lake to support self-service reporting, KPI tracking, claims trend analysis, and provider performance reporting.',
      'Supported AI, machine learning, and RAG pipeline initiatives by preparing governed, curated, and feature-ready datasets for model training, semantic search, vector-based retrieval, anomaly detection, and predictive analytics.',
      'Collaborated with data science teams to build feature engineering pipelines and ML-ready datasets using Databricks Feature Store, PySpark, Delta Lake, and Snowflake for risk scoring and member segmentation use cases.',
      'Designed cross-cloud ingestion pipelines to securely integrate partner and provider datasets from AWS S3 into Azure using automated validation, schema checks, and Databricks-based transformation workflows.',
      'Implemented real-time validation workflows using Azure Event Grid, Azure Functions, and Databricks to detect anomalies in eligibility, claims, and provider data before downstream reporting impact.',
      'Improved production reliability by redesigning orchestration logic in Azure Data Factory, adding dependency-aware triggers, retry mechanisms, data quality gates, and SLA-based monitoring, reducing recurring pipeline failures by 40%.',
      'Automated infrastructure provisioning and deployments using Terraform, Azure DevOps Pipelines, Git, and CI/CD, ensuring consistent environment configuration across development, testing, and production while reducing manual configuration drift.',
      'Mentored data engineers and analysts through architecture reviews, code reviews, PySpark optimization sessions, data modeling guidance, and governance best practices to improve delivery quality and platform maturity.',
    ],
    tech: [
      'Azure Data Factory',
      'Azure Databricks',
      'Azure Synapse Analytics',
      'Snowflake',
      'Delta Lake',
      'ADLS Gen2',
      'Azure Monitor',
      'Azure DevOps',
      'Azure Functions',
      'Azure Key Vault',
      'Terraform',
      'Power BI',
      'Great Expectations',
      'RBAC',
      'Managed Identity',
      'AWS S3',
      'GCP',
      'PySpark',
      'dbt',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'MetLife',
    location: 'New York City, NY',
    period: 'Mar 2023 – Apr 2024',
    icon: '🛡️',
    color: '#FCDB05',
    level: 'LVL 5',
    xp: '85%',
    headline: 'Insurance data platform modernization',
    summary:
      'Insurance data platform team modernizing policy, claims, underwriting, actuarial, and customer analytics pipelines across cloud data lake and warehouse environments.',
    achievements: [
      "Supported MetLife's insurance data platform team in modernizing policy, claims, underwriting, actuarial, and customer analytics data pipelines across cloud-based data lake and warehouse environments.",
      'Developed ingestion pipelines for policy, claims, billing, and underwriting datasets using AWS Glue, Amazon S3, PySpark, and SQL, improving data availability for reporting and downstream analytics teams.',
      'Re-engineered legacy SSIS and SQL-based workflows into scalable PySpark transformation jobs with incremental load logic, partitioning, and reusable processing patterns for insurance data workloads.',
      'Built and maintained structured data lake zones for raw, enriched, and curated datasets, applying file organization, compression, partitioning, and metadata standards to support better data discovery and performance.',
      'Created transformation logic in Databricks using Delta Lake, PySpark, schema enforcement, and merge patterns to support actuarial analysis, claims reporting, and regulatory data needs.',
      'Assisted with Snowflake warehouse optimization by tuning SQL queries, reviewing query profiles, supporting warehouse right-sizing, and improving performance for reporting and analytics workloads.',
      'Developed modular dbt models to prepare curated data marts for claims analytics, policy lifecycle reporting, underwriting performance, and actuarial business reporting.',
      'Supported event-driven data processing for priority claims and fraud-related data using Kinesis, Lambda, and cloud-based ingestion patterns, improving data readiness for investigation workflows.',
      'Created SQL-based datasets and reporting layers for Power BI, Tableau, and business dashboards, helping claims, underwriting, actuarial, and leadership teams track KPIs and operational trends.',
      'Assisted in building governed access patterns using IAM, role-based access controls, masking rules, encryption standards, and audit logging to protect sensitive policyholder and claims data.',
      'Supported data quality checks using SQL, Python, and validation rules to identify missing records, schema mismatches, duplicate data, and reconciliation issues across insurance data pipelines.',
      'Prepared clean and structured datasets to support AI, machine learning, fraud analytics, anomaly detection, and risk scoring use cases for claims and customer data analysis.',
      'Used Terraform, Git, and CI/CD pipelines to support repeatable deployments, version control, and controlled releases across development and production environments.',
      'Monitored data pipeline health using CloudWatch, logs, alerts, and operational dashboards, helping troubleshoot failed jobs, delayed loads, and production data issues.',
      'Collaborated with senior engineers, BI developers, analysts, and business stakeholders to review requirements, support data modeling, document pipeline logic, and deliver reliable analytics-ready datasets.',
    ],
    tech: [
      'AWS Glue',
      'Amazon S3',
      'Kinesis',
      'Lambda',
      'Redshift',
      'Athena',
      'QuickSight',
      'Snowflake',
      'Databricks',
      'Delta Lake',
      'Apache Airflow',
      'Terraform',
      'CodePipeline',
      'Azure Blob Storage',
      'Google Cloud Storage',
      'Lake Formation',
      'dbt',
      'PySpark',
      'CI/CD',
    ],
  },
  {
    title: 'ETL Developer',
    company: 'Home Depot',
    location: 'Atlanta, GA',
    period: 'Sept 2019 – Feb 2023',
    icon: '🏠',
    color: '#17DD62',
    level: 'LVL 3',
    xp: '70%',
    headline: 'Enterprise retail, inventory & supply-chain ETL',
    summary:
      'Retail Data and Supply Chain Analytics team, supporting ETL development for sales, inventory, merchandising, pricing, and supplier datasets across store operations and e-commerce reporting.',
    achievements: [
      "Worked within Home Depot's Retail Data and Supply Chain Analytics team, supporting ETL development for sales, inventory, merchandising, pricing, and supplier datasets across store operations and e-commerce reporting platforms.",
      'Developed and maintained ETL workflows using Informatica PowerCenter, SSIS, SQL Server, Oracle, Teradata, and flat file sources to support enterprise data warehouse and retail analytics requirements.',
      'Created source-to-target mappings, transformation logic, lookup rules, filters, joins, aggregations, and data validation checks to load structured retail data into centralized warehouse tables.',
      'Built SQL-based transformation logic using T-SQL, PL/SQL, stored procedures, views, and set-based processing to support nightly batch loads for high-volume POS, inventory, and promotional datasets.',
      'Supported performance tuning of ETL jobs by reviewing query execution plans, optimizing joins, improving indexing strategies, and assisting with partitioned table loads in Teradata and SQL Server.',
      'Enhanced existing SSIS packages by adding reusable variables, parameters, checkpoints, error handling, and dependency checks to improve batch processing stability.',
      'Developed and maintained Informatica PowerCenter mappings, sessions, and workflows for extracting data from relational databases, flat files, and operational retail systems.',
      'Implemented SCD Type 1 and SCD Type 2 logic for product, pricing, supplier, and store dimension tables to support historical tracking and accurate retail reporting.',
      'Created reconciliation scripts using SQL and Shell Scripting to compare source and target record counts, identify missing records, and validate data accuracy after ETL loads.',
      'Assisted in building star schema and snowflake schema structures for sales, inventory, merchandising, and supply chain reporting within enterprise data warehouse environments.',
      'Scheduled and monitored ETL jobs using SQL Server Agent, Informatica Workflow Monitor, and batch scripts, supporting timely completion of daily and weekly data refresh cycles.',
      'Troubleshot production ETL failures by reviewing logs, identifying data quality issues, coordinating with senior engineers, and applying fixes for recurring load and transformation errors.',
      'Supported report-ready datasets for SSRS, Crystal Reports, Power BI, and business dashboards used by merchandising, inventory planning, finance, and operations teams.',
      'Used TFS, Git, and change management processes to manage ETL code versions, package migrations, deployment documentation, and release activities across environments.',
      'Collaborated with data modelers, QA analysts, business analysts, and senior data engineers to gather requirements, document mapping logic, validate test results, and deliver reliable analytics-ready datasets.',
    ],
    tech: [
      'Informatica PowerCenter',
      'SSIS',
      'SQL Server',
      'Oracle',
      'Teradata',
      'DB2',
      'dbt',
      'PL/SQL',
      'T-SQL',
      'Bash',
      'Shell Scripting',
      'Crystal Reports',
      'SSRS',
      'TFS',
      'SCD',
      'ETL',
      'Data Warehousing',
      'Star Schema',
      'Performance Tuning',
    ],
  },
]

export const education = {
  degree: 'Bachelor of Science in Information Systems',
  school: 'University of Texas at Arlington',
  location: 'Arlington, TX',
  icon: '🎓',
  summary:
    'Foundational training in information systems, databases, systems analysis, and business technology — the base for a career building enterprise data platforms.',
}

export const certifications: Certification[] = [
  {
    name: 'Databricks Certified Data Engineer Associate',
    shortName: 'Databricks Data Engineer',
    issuer: 'Databricks',
    icon: '🔷',
    color: '#4AEDD9',
    rarity: 'Legendary',
    rarityColor: '#FCDB05',
    description:
      'Validates hands-on design of lakehouse pipelines with Delta Lake, Apache Spark, Databricks Workflows, and Unity Catalog.',
    focus: ['Delta Lake', 'Apache Spark', 'Lakehouse', 'Workflows'],
  },
  {
    name: 'Microsoft Certified: Azure Data Engineer Associate (DP-203)',
    shortName: 'Azure Data Engineer',
    issuer: 'Microsoft',
    icon: '☁️',
    color: '#7BA4D4',
    rarity: 'Epic',
    rarityColor: '#B02E26',
    description:
      'Covers designing and implementing data storage, processing, security, and monitoring on Azure.',
    focus: ['Azure Data Factory', 'Synapse', 'Databricks', 'Storage'],
  },
  {
    name: 'Snowflake SnowPro Core Certification',
    shortName: 'SnowPro Core',
    issuer: 'Snowflake',
    icon: '❄️',
    color: '#4AEDD9',
    rarity: 'Rare',
    rarityColor: '#4AEDD9',
    description:
      'Validates Snowflake architecture, performance tuning, security, data sharing, and warehouse management.',
    focus: ['Architecture', 'Performance', 'Security', 'Data Sharing'],
  },
]

/** Reserved for future featured case studies; keeps the section honest today. */
export const featuredWork = [
  {
    title: 'Healthcare Lakehouse Modernization',
    company: 'Elevance Health',
    icon: '🏥',
    color: '#4AEDD9',
    problem:
      'Fragmented ingestion across claims, eligibility, provider, and clinical quality sources slowed analytics.',
    solution:
      'Standardized a Bronze / Silver / Gold lakehouse on ADLS Gen2, Databricks, Delta Lake, and Snowflake with metadata-driven pipelines.',
    results: ['120M+ claims records per day', '35% faster analytics readiness', '40% fewer recurring failures'],
  },
  {
    title: 'Insurance Data Platform Rebuild',
    company: 'MetLife',
    icon: '🛡️',
    color: '#FCDB05',
    problem:
      'Legacy SSIS and SQL workflows limited scale for policy, claims, underwriting, and actuarial analytics.',
    solution:
      'Re-platformed ingestion and transformation to AWS Glue, S3, PySpark, Databricks, Delta Lake, and dbt marts.',
    results: ['Reusable incremental load patterns', 'Event-driven fraud data', 'Curated BI-ready marts'],
  },
  {
    title: 'Retail & Supply-Chain ETL',
    company: 'Home Depot',
    icon: '🏠',
    color: '#17DD62',
    problem:
      'High-volume POS, inventory, pricing, and promotional loads needed reliable nightly warehouse refreshes.',
    solution:
      'Built Informatica, SSIS, T-SQL, and PL/SQL workflows with SCD history, reconciliation, and performance tuning.',
    results: ['Stable nightly batch loads', 'Accurate SCD history', 'Trusted merchandising reporting'],
  },
]
