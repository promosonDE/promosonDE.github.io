// jsPDF is large (~350KB), so it is loaded on demand when the user
// actually clicks "Download CV" instead of being part of the initial bundle.

const MARGIN = 20; // mm
const BOTTOM = 282; // mm — A4 page height is 297mm

export const downloadCV = async () => {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  let y = MARGIN;

  /** Starts a new page when the next block would run past the bottom margin. */
  const ensure = (height: number): boolean => {
    if (y + height > BOTTOM) {
      doc.addPage();
      y = MARGIN;
      return true;
    }
    return false;
  };

  /** Centered header line (wraps if wider than the printable area). */
  const centered = (text: string, size: number, lineHeight: number, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    const lines: string[] = doc.splitTextToSize(text, pageWidth - 20);
    lines.forEach((line) => {
      doc.text(line, pageWidth / 2, y, { align: 'center' });
      y += lineHeight;
    });
  };

  /** Section heading (e.g. TECHNICAL SKILLS). */
  const heading = (text: string) => {
    ensure(18);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(text, MARGIN, y);
    y += 6;
  };

  /** Left-aligned paragraph that wraps and paginates automatically. */
  const wrapped = (text: string, lineHeight = 5, x = MARGIN) => {
    const width = pageWidth - x - MARGIN;
    const lines: string[] = doc.splitTextToSize(text, width);
    lines.forEach((line) => {
      ensure(lineHeight);
      doc.text(line, x, y);
      y += lineHeight;
    });
  };

  /** A single CV bullet with hanging indent. */
  const bullet = (text: string, size = 9, lineHeight = 4.5) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    const lines: string[] = doc.splitTextToSize(`• ${text}`, pageWidth - 45);
    lines.forEach((line) => {
      ensure(lineHeight);
      doc.text(line, MARGIN + 5, y);
      y += lineHeight;
    });
    y += 1.5;
  };

  /**
   * "Label: value" row where the value wraps beside the label on the first
   * line and continues below it — used for skills and Key Technologies.
   */
  const labeled = (label: string, value: string, size = 9, lineHeight = 4.5) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    const labelWidth = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    const lines: string[] = doc.splitTextToSize(value, pageWidth - 40 - labelWidth);
    const textX = MARGIN + labelWidth;

    lines.forEach((line, index) => {
      const newPage = ensure(lineHeight);
      if (index === 0) {
        // Label always sits on the same line as the start of its value.
        doc.setFont('helvetica', 'bold');
        doc.text(label, MARGIN, y);
        doc.setFont('helvetica', 'normal');
        doc.text(line, textX, y);
      } else if (newPage) {
        // Continuation that spilled onto a fresh page: resume at the margin.
        doc.text(line, MARGIN, y);
      } else {
        doc.text(line, textX, y);
      }
      y += lineHeight;
    });
    y += 1.5;
  };

  /** Job entry: title, company line, bullets, optional Key Technologies row. */
  const job = (title: string, meta: string, bullets: string[], keyTechnologies: string) => {
    ensure(34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, MARGIN, y);
    y += 5.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(meta, MARGIN, y);
    y += 6.5;

    bullets.forEach((item) => bullet(item));

    y += 2.5;
    if (keyTechnologies) labeled('Key Technologies: ', keyTechnologies, 8.5, 4.2);
    y += 5;
  };

  // ── Header ─────────────────────────────────────────────────────────────
  centered('PROMOSON POUDEL', 24, 10, true);
  centered('Senior Data Engineer', 11, 6);
  centered(
    'Promosonpoudel440@gmail.com | 469-587-9546 | www.linkedin.com/in/promoson-poudel-5358ba1b5',
    10,
    5
  );
  y += 6;

  // ── Professional Summary ───────────────────────────────────────────────
  heading('PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  const summary = [
    'Accomplished and versatile Senior Data Engineer with 6+ years of experience architecting scalable, secure, and high performance data platforms across healthcare, finance, insurance, and retail domains. Strong expertise in designing modern cloud native Lakehouse Architecture, enterprise Data Warehouses, and analytics platforms using Azure Data Factory, Azure Databricks, Snowflake, Delta Lake, AWS Glue, Amazon S3, Amazon Redshift, GCP BigQuery, Dataflow, Pub/Sub, and Dataproc.',
    'Skilled in building metadata driven ETL/ELT Frameworks, batch and real time streaming pipelines, Data Integration solutions, and optimized Data Models that improve scalability, governance, Data Quality, Data Lineage, and regulatory compliance aligned with HIPAA, GDPR, and enterprise security standards.',
    'Experienced in developing AI ready data platforms and supporting Generative AI and RAG Pipeline use cases by preparing curated, governed, and analytics ready datasets for Machine Learning, Vector Search, Semantic Retrieval, advanced analytics, and executive reporting.',
    'Proficient in Python, SQL, PySpark, Apache Spark, Kafka, Airflow, dbt, Terraform, Git, Azure DevOps, CI/CD Automation, API Integrations, and cloud native monitoring tools to deliver reliable production grade data solutions.',
    'Adept at collaborating with data science, BI, DevOps, security, and business teams to deliver trusted datasets, Power BI and Tableau dashboards, machine learning workflows, and mission critical decision making solutions at enterprise scale.',
  ];
  summary.forEach((paragraph, index) => {
    if (index > 0) y += 2.5;
    wrapped(paragraph);
  });

  // ── Technical Skills ───────────────────────────────────────────────────
  heading('TECHNICAL SKILLS');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  const skills: [string, string][] = [
    ['Cloud Platforms & Services: ', 'Azure (Azure Data Factory, Azure Databricks, Synapse Analytics, ADLS Gen2, Event Hubs, Event Grid, Azure Functions, Azure SQL Database, Blob Storage, Azure Monitor, Log Analytics, Key Vault, Managed Identity, Microsoft Purview), AWS (Glue, S3, Redshift, Lambda, Kinesis, EC2, IAM, CloudWatch, Lake Formation, Athena, Step Functions, EventBridge, RDS, DynamoDB), GCP (BigQuery, Cloud Storage, Pub/Sub, Dataproc, Dataflow, Cloud Composer, Cloud Functions, Cloud IAM, Cloud Logging, Cloud Monitoring)'],
    ['Data Warehousing: ', 'Snowflake, Amazon Redshift, Azure Synapse Analytics, Google BigQuery, SQL Server, Oracle, Teradata'],
    ['Snowflake Features: ', 'Streams, Tasks, External Tables, Secure Data Sharing, Dynamic Data Masking, Zero Copy Cloning, Time Travel, Snowpipe, Materialized Views, Query Optimization'],
    ['Lakehouse Platforms: ', 'Azure Databricks, Delta Lake, Delta Live Tables, Databricks Workflows, Unity Catalog, Databricks Repos, Feature Store, Medallion Architecture, Bronze Silver Gold Layers'],
    ['ETL and ELT Tools: ', 'Azure Data Factory, AWS Glue, Apache Airflow, MWAA, dbt, Informatica PowerCenter, SSIS, SQL Based ELT, CDC, Autoloader, Glue Workflows'],
    ['Data Orchestration: ', 'Apache Airflow, Azure Data Factory Pipelines, Databricks Workflows, AWS Step Functions, EventBridge, Azure Event Grid, Cloud Composer'],
    ['Programming Languages: ', 'Python, SQL, PySpark, Spark SQL, T SQL, PL/SQL, Bash, Shell Scripting, Scala'],
    ['Big Data Processing: ', 'Apache Spark, PySpark, Spark SQL, Databricks, Dataproc, AWS Glue Spark, EMR, Distributed Processing, Partitioning, Caching, Performance Tuning'],
    ['Streaming and Real Time Processing: ', 'Apache Kafka, Amazon Kinesis Data Streams, Azure Event Hubs, Google Pub/Sub, Spark Structured Streaming, Micro Batch Processing, Event Driven Architecture'],
    ['Databases: ', 'PostgreSQL, MySQL, SQL Server, Oracle, Teradata, MongoDB, Redis, DynamoDB, Amazon RDS, Azure SQL Database'],
    ['Data Modeling: ', 'Dimensional Modeling, Star Schema, Snowflake Schema, SCD Type 2, Slowly Changing Dimensions, Data Vault Basics, Fact and Dimension Tables, Schema Evolution'],
    ['Data Architecture: ', 'Lakehouse Architecture, Delta Architecture, Medallion Architecture, Data Lake, Enterprise Data Warehouse, Metadata Driven Design, Reusable Pipeline Frameworks'],
    ['Data Governance and Security: ', 'Microsoft Purview, Unity Catalog, AWS Lake Formation, Data Cataloging, Data Lineage, RBAC, IAM Policies, PII Protection, Encryption, Dynamic Masking, Secure Data Sharing'],
    ['Data Quality and Validation: ', 'Great Expectations, Data Profiling, Data Reconciliation, Schema Validation, SLA Monitoring, Exception Handling, Audit Logging, Data Quality Rules'],
    ['DevOps and CI/CD: ', 'Azure DevOps Pipelines, GitHub Actions, Git, Databricks Repos, CI/CD Automation, Release Management, Version Control, Deployment Automation'],
    ['Infrastructure as Code: ', 'Terraform, IAM/RBAC Policies, Cloud Resource Provisioning, Environment Configuration, Reusable Infrastructure Modules'],
    ['Monitoring and Observability: ', 'Azure Monitor, Log Analytics, AWS CloudWatch, Cloud Logging, Cloud Monitoring, Databricks Jobs Monitoring, SLA Alerts, Custom Dashboards'],
    ['AI, ML and GenAI Data Support: ', 'Feature Engineering Pipelines, Feature Store, RAG Pipelines, Vector Search, Semantic Retrieval, Embeddings Data Preparation, ML Ready Datasets, Model Input Pipelines'],
    ['BI and Reporting Tools: ', 'Power BI, Tableau, Looker Studio, Excel, Executive Dashboards, KPI Reporting, Self Service Analytics'],
    ['APIs and Data Integration: ', 'REST APIs, JSON Parsing, XML Parsing, API Based Ingestion, File Based Ingestion, Batch Integration, Real Time Integration'],
    ['File Formats: ', 'Parquet, Avro, ORC, CSV, JSON, XML, Delta Format'],
    ['Operating Systems and Tools: ', 'Linux, Unix, Windows, Jira, Confluence, Agile Scrum, ServiceNow'],
  ];
  skills.forEach(([category, tools]) => labeled(category, tools));

  // ── Professional Experience ────────────────────────────────────────────
  heading('PROFESSIONAL EXPERIENCE');

  job(
    'Senior Data Engineer',
    'Elevance Health | Indianapolis, IN | May 2024 – Present',
    [
      "Served on Elevance Health's Enterprise Healthcare Data Modernization team, designing a scalable healthcare lakehouse platform using Azure Data Lake Gen2, Azure Databricks, Delta Lake, and Snowflake to unify claims, eligibility, provider, and clinical quality datasets supporting 120M+ claims records daily.",
      'Re engineered fragmented ingestion workflows into a standardized Bronze, Silver, and Gold architecture using Databricks Autoloader, PySpark, CDC, Delta Lake, and dbt, improving data freshness and analytics readiness by 35%.',
      'Built reusable metadata driven ETL/ELT pipelines in Azure Data Factory and Azure Databricks to support batch, incremental, and partner data feeds with improved scalability and operational consistency.',
      'Designed secure data architecture for PHI, PII, and healthcare sensitive workloads by implementing RBAC, Managed Identities, Azure Key Vault, encryption, masking policies, and access controls aligned with HIPAA standards.',
      'Optimized large scale PySpark workloads in Azure Databricks by improving partitioning, shuffle management, caching, and Delta table design, reducing pipeline runtime by 35 to 40% and improving compute efficiency.',
      'Enhanced Snowflake performance and cost governance through warehouse right sizing, clustering, query profile analysis, materialized views, secure data sharing, row level security, and dynamic masking, reducing annual warehouse spend by 25 to 30%.',
      'Partnered with clinical quality, risk adjustment, actuarial, finance, and BI teams to deliver curated datasets for HEDIS, RAF scoring, regulatory reporting, executive dashboards, and operational analytics.',
      'Developed semantic marts and dimensional data models using dbt, SQL, Snowflake, and Delta Lake to support self service reporting, KPI tracking, claims trend analysis, and provider performance reporting.',
      'Supported AI, machine learning, and RAG pipeline initiatives by preparing governed, curated, and feature ready datasets for model training, semantic search, vector based retrieval, anomaly detection, and predictive analytics.',
      'Collaborated with data science teams to build feature engineering pipelines and ML ready datasets using Databricks Feature Store, PySpark, Delta Lake, and Snowflake for risk scoring and member segmentation use cases.',
      'Designed cross cloud ingestion pipelines to securely integrate partner and provider datasets from AWS S3 into Azure using automated validation, schema checks, and Databricks based transformation workflows.',
      'Implemented real time validation workflows using Azure Event Grid, Azure Functions, and Databricks to detect anomalies in eligibility, claims, and provider data before downstream reporting impact.',
      'Improved production reliability by redesigning orchestration logic in Azure Data Factory, adding dependency aware triggers, retry mechanisms, data quality gates, and SLA based monitoring, reducing recurring pipeline failures by 40%.',
      'Automated infrastructure provisioning and deployments using Terraform, Azure DevOps Pipelines, Git, and CI/CD, ensuring consistent environment configuration across development, testing, and production while reducing manual configuration drift.',
      'Mentored data engineers and analysts through architecture reviews, code reviews, PySpark optimization sessions, data modeling guidance, and governance best practices to improve delivery quality and platform maturity.',
    ],
    'Azure Data Factory, Azure Databricks, Azure Synapse Analytics, Snowflake, Delta Lake, Azure Data Lake Storage Gen2, Azure Monitor, Azure DevOps, Azure Functions, Azure Key Vault, Terraform, Power BI, ADF, Great Expectations, RBAC, Managed Identity, AWS S3, GCP, PySpark, dbt'
  );

  job(
    'Data Engineer',
    'MetLife | New York City, NY | Mar 2023 – Apr 2024',
    [
      "Supported MetLife's insurance data platform team in modernizing policy, claims, underwriting, actuarial, and customer analytics data pipelines across cloud based data lake and warehouse environments.",
      'Developed ingestion pipelines for policy, claims, billing, and underwriting datasets using AWS Glue, Amazon S3, PySpark, and SQL, improving data availability for reporting and downstream analytics teams.',
      'Re engineered legacy SSIS and SQL based workflows into scalable PySpark transformation jobs with incremental load logic, partitioning, and reusable processing patterns for insurance data workloads.',
      'Built and maintained structured data lake zones for raw, enriched, and curated datasets, applying file organization, compression, partitioning, and metadata standards to support better data discovery and performance.',
      'Created transformation logic in Databricks using Delta Lake, PySpark, schema enforcement, and merge patterns to support actuarial analysis, claims reporting, and regulatory data needs.',
      'Assisted with Snowflake warehouse optimization by tuning SQL queries, reviewing query profiles, supporting warehouse right sizing, and improving performance for reporting and analytics workloads.',
      'Developed modular dbt models to prepare curated data marts for claims analytics, policy lifecycle reporting, underwriting performance, and actuarial business reporting.',
      'Supported event driven data processing for priority claims and fraud related data using Kinesis, Lambda, and cloud based ingestion patterns, improving data readiness for investigation workflows.',
      'Created SQL based datasets and reporting layers for Power BI, Tableau, and business dashboards, helping claims, underwriting, actuarial, and leadership teams track KPIs and operational trends.',
      'Assisted in building governed access patterns using IAM, role based access controls, masking rules, encryption standards, and audit logging to protect sensitive policyholder and claims data.',
      'Supported data quality checks using SQL, Python, and validation rules to identify missing records, schema mismatches, duplicate data, and reconciliation issues across insurance data pipelines.',
      'Prepared clean and structured datasets to support AI, machine learning, fraud analytics, anomaly detection, and risk scoring use cases for claims and customer data analysis.',
      'Used Terraform, Git, and CI/CD pipelines to support repeatable deployments, version control, and controlled releases across development and production environments.',
      'Monitored data pipeline health using CloudWatch, logs, alerts, and operational dashboards, helping troubleshoot failed jobs, delayed loads, and production data issues.',
      'Collaborated with senior engineers, BI developers, analysts, and business stakeholders to review requirements, support data modeling, document pipeline logic, and deliver reliable analytics ready datasets.',
    ],
    'AWS Glue, Amazon S3, Kinesis, Lambda, Redshift, Athena, QuickSight, Snowflake, Databricks, Delta Lake, Apache Airflow, Terraform, CodePipeline, Azure Blob Storage, Google Cloud Storage, Lake Formation, dbt, PySpark, CI/CD'
  );

  job(
    'ETL Developer',
    'Home Depot | Atlanta, GA | Sept 2019 – Feb 2023',
    [
      "Worked within Home Depot's Retail Data and Supply Chain Analytics team, supporting ETL development for sales, inventory, merchandising, pricing, and supplier datasets across store operations and e commerce reporting platforms.",
      'Developed and maintained ETL workflows using Informatica PowerCenter, SSIS, SQL Server, Oracle, Teradata, and flat file sources to support enterprise data warehouse and retail analytics requirements.',
      'Created source to target mappings, transformation logic, lookup rules, filters, joins, aggregations, and data validation checks to load structured retail data into centralized warehouse tables.',
      'Built SQL based transformation logic using T SQL, PL/SQL, stored procedures, views, and set based processing to support nightly batch loads for high volume POS, inventory, and promotional datasets.',
      'Supported performance tuning of ETL jobs by reviewing query execution plans, optimizing joins, improving indexing strategies, and assisting with partitioned table loads in Teradata and SQL Server.',
      'Enhanced existing SSIS packages by adding reusable variables, parameters, checkpoints, error handling, and dependency checks to improve batch processing stability.',
      'Developed and maintained Informatica PowerCenter mappings, sessions, and workflows for extracting data from relational databases, flat files, and operational retail systems.',
      'Implemented SCD Type 1 and SCD Type 2 logic for product, pricing, supplier, and store dimension tables to support historical tracking and accurate retail reporting.',
      'Created reconciliation scripts using SQL and Shell Scripting to compare source and target record counts, identify missing records, and validate data accuracy after ETL loads.',
      'Assisted in building star schema and snowflake schema structures for sales, inventory, merchandising, and supply chain reporting within enterprise data warehouse environments.',
      'Scheduled and monitored ETL jobs using SQL Server Agent, Informatica Workflow Monitor, and batch scripts, supporting timely completion of daily and weekly data refresh cycles.',
      'Troubleshot production ETL failures by reviewing logs, identifying data quality issues, coordinating with senior engineers, and applying fixes for recurring load and transformation errors.',
      'Supported report ready datasets for SSRS, Crystal Reports, Power BI, and business dashboards used by merchandising, inventory planning, finance, and operations teams.',
      'Used TFS, Git, and change management processes to manage ETL code versions, package migrations, deployment documentation, and release activities across environments.',
      'Collaborated with data modelers, QA analysts, business analysts, and senior data engineers to gather requirements, document mapping logic, validate test results, and deliver reliable analytics ready datasets.',
    ],
    'Informatica PowerCenter, SSIS, SQL Server, Oracle, Teradata, DB2, dbt, PL/SQL, Bash, Shell Scripting, Crystal Reports, SSRS, TFS, SCD, ETL, Data Warehousing, Star Schema, Performance Tuning'
  );

  // ── Education ──────────────────────────────────────────────────────────
  heading('EDUCATION');
  ensure(16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Bachelor of Science in Information Systems', MARGIN, y);
  y += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('University of Texas at Arlington, Arlington, TX', MARGIN, y);
  y += 8;

  // ── Certifications ─────────────────────────────────────────────────────
  heading('CERTIFICATIONS');
  bullet('Databricks Certified Data Engineer Associate', 10, 5);
  bullet('Microsoft Certified: Azure Data Engineer Associate (DP-203)', 10, 5);
  bullet('Snowflake SnowPro Core Certification', 10, 5);

  // Save the PDF
  doc.save('Promoson_Poudel_CV.pdf');
};
