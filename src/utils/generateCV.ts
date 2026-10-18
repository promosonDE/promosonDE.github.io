import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const downloadCV = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PROMASON POUDEL', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Senior Data Engineer', pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;

  // Contact Info
  doc.setFontSize(10);
  doc.text('Email: Promosonpoudel440@gmail.com', pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;
  doc.text('Phone: 469-587-9546', pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;
  doc.text('LinkedIn: linkedin.com/in/promoson-poudel-5358ba1b5', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Professional Summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', 20, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summary = `Accomplished and versatile Senior Data Engineer with 6+ years of experience architecting scalable, secure, and high-performance data platforms across healthcare, finance, insurance, and retail domains. Strong expertise in designing modern cloud-native Lakehouse Architecture, enterprise Data Warehouses, and analytics platforms using Azure Data Factory, Azure Databricks, Snowflake, Delta Lake, AWS Glue, Amazon S3, Amazon Redshift, GCP BigQuery, Dataflow, Pub/Sub, and Dataproc.

Skilled in building metadata-driven ETL/ELT Frameworks, batch and real-time streaming pipelines, Data Integration solutions, and optimized Data Models that improve scalability, governance, Data Quality, Data Lineage, and regulatory compliance aligned with HIPAA, GDPR, and enterprise security standards.

Experienced in developing AI-ready data platforms and supporting Generative AI and RAG Pipeline use cases by preparing curated, governed, and analytics-ready datasets for Machine Learning, Vector Search, Semantic Retrieval, advanced analytics, and executive reporting.`;

  const summaryLines = doc.splitTextToSize(summary, pageWidth - 40);
  doc.text(summaryLines, 20, yPos);
  yPos += summaryLines.length * 5 + 10;

  // Technical Skills
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', 20, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const skills = [
    ['Cloud Platforms', 'Azure (ADF, Databricks, Synapse, ADLS, Functions), AWS (Glue, S3, Redshift, Lambda, Kinesis), GCP (BigQuery, Dataflow, Pub/Sub, Dataproc)'],
    ['Data Warehousing', 'Snowflake, Amazon Redshift, Azure Synapse Analytics, Google BigQuery, SQL Server, Oracle, Teradata'],
    ['Lakehouse Platforms', 'Azure Databricks, Delta Lake, Delta Live Tables, Unity Catalog, Feature Store, Medallion Architecture'],
    ['ETL/ELT Tools', 'Azure Data Factory, AWS Glue, Apache Airflow, dbt, Informatica PowerCenter, SSIS'],
    ['Programming Languages', 'Python, SQL, PySpark, Spark SQL, T-SQL, PL/SQL, Bash, Shell Scripting, Scala'],
    ['Big Data Processing', 'Apache Spark, PySpark, Databricks, Dataproc, EMR, Distributed Processing, Performance Tuning'],
    ['Streaming', 'Apache Kafka, Amazon Kinesis, Azure Event Hubs, Google Pub/Sub, Spark Structured Streaming'],
    ['Databases', 'PostgreSQL, MySQL, SQL Server, Oracle, MongoDB, Redis, DynamoDB'],
    ['Data Modeling', 'Dimensional Modeling, Star Schema, Snowflake Schema, SCD Type 2, Data Vault'],
    ['Data Governance', 'Microsoft Purview, Unity Catalog, AWS Lake Formation, Data Lineage, RBAC, PII Protection'],
    ['DevOps/CI-CD', 'Azure DevOps, GitHub Actions, Git, Terraform, CI/CD Automation'],
    ['AI/ML Support', 'Feature Engineering, RAG Pipelines, Vector Search, Semantic Retrieval, ML-Ready Datasets'],
    ['BI Tools', 'Power BI, Tableau, Looker Studio, Executive Dashboards, KPI Reporting'],
  ];

  skills.forEach(([category, tools]) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`${category}:`, 20, yPos);
    doc.setFont('helvetica', 'normal');
    const toolsLines = doc.splitTextToSize(tools, pageWidth - 80);
    doc.text(toolsLines, 20 + doc.getTextWidth(`${category}: `) + 2, yPos);
    yPos += toolsLines.length * 5 + 3;
  });

  yPos += 5;

  // Professional Experience
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL EXPERIENCE', 20, yPos);
  yPos += 10;

  // Elevance Health
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Senior Data Engineer', 20, yPos);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Elevance Health | Indianapolis, IN | May 2024 – Present', 20, yPos + 6);
  yPos += 14;

  const elavanceBullets = [
    'Designed scalable healthcare lakehouse platform using Azure Data Lake Gen2, Azure Databricks, Delta Lake, and Snowflake supporting 120M+ claims records daily',
    'Re-engineered ingestion workflows into Bronze/Silver/Gold architecture, improving data freshness by 35%',
    'Optimized PySpark workloads, reducing pipeline runtime by 35-40%',
    'Enhanced Snowflake performance, reducing annual warehouse spend by 25-30%',
    'Improved production reliability, reducing pipeline failures by 40%',
    'Supported AI/ML and RAG pipeline initiatives with governed datasets',
    'Implemented real-time validation workflows using Azure Event Grid and Functions',
    'Automated infrastructure provisioning using Terraform and CI/CD pipelines',
    'Mentored data engineers through architecture reviews and optimization sessions',
  ];

  doc.setFontSize(9);
  elavanceBullets.forEach((bullet) => {
    if (yPos > 275) {
      doc.addPage();
      yPos = 20;
    }
    const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - 45);
    doc.text(bulletLines, 25, yPos);
    yPos += bulletLines.length * 4.5 + 2;
  });

  yPos += 5;

  // MetLife
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Data Engineer', 20, yPos);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('MetLife | New York City, NY | Mar 2023 – Apr 2024', 20, yPos + 6);
  yPos += 14;

  const metlifeBullets = [
    'Developed ingestion pipelines for policy, claims, billing, and underwriting datasets using AWS Glue, S3, PySpark',
    'Re-engineered legacy SSIS workflows into scalable PySpark transformation jobs',
    'Built structured data lake zones for raw, enriched, and curated datasets',
    'Created transformation logic in Databricks using Delta Lake and merge patterns',
    'Developed modular dbt models for curated data marts',
    'Supported event-driven data processing using Kinesis and Lambda',
    'Created SQL-based datasets for Power BI and Tableau dashboards',
    'Prepared datasets to support AI/ML fraud analytics and risk scoring',
  ];

  doc.setFontSize(9);
  metlifeBullets.forEach((bullet) => {
    if (yPos > 275) {
      doc.addPage();
      yPos = 20;
    }
    const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - 45);
    doc.text(bulletLines, 25, yPos);
    yPos += bulletLines.length * 4.5 + 2;
  });

  yPos += 5;

  // Home Depot
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ETL Developer', 20, yPos);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Home Depot | Atlanta, GA | Sept 2019 – Feb 2023', 20, yPos + 6);
  yPos += 14;

  const homeDepotBullets = [
    'Developed ETL workflows using Informatica PowerCenter, SSIS, SQL Server, Oracle, Teradata',
    'Created source-to-target mappings, transformation logic, and data validation checks',
    'Built SQL-based transformation logic using T-SQL, PL/SQL, stored procedures',
    'Supported performance tuning of ETL jobs and optimized joins',
    'Implemented SCD Type 1 and Type 2 logic for dimension tables',
    'Created reconciliation scripts using SQL and Shell Scripting',
    'Assisted in building star schema and snowflake schema structures',
    'Supported report-ready datasets for SSRS, Crystal Reports, Power BI',
  ];

  doc.setFontSize(9);
  homeDepotBullets.forEach((bullet) => {
    if (yPos > 275) {
      doc.addPage();
      yPos = 20;
    }
    const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - 45);
    doc.text(bulletLines, 25, yPos);
    yPos += bulletLines.length * 4.5 + 2;
  });

  yPos += 8;

  // Education
  if (yPos > 260) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', 20, yPos);
  yPos += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Bachelor of Science in Information Systems', 20, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('University of Texas at Arlington, Arlington, TX', 20, yPos);
  yPos += 12;

  // Certifications
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATIONS', 20, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const certifications = [
    'Databricks Certified Data Engineer Associate',
    'Microsoft Certified: Azure Data Engineer Associate (DP-203)',
    'Snowflake SnowPro Core Certification',
  ];

  certifications.forEach((cert) => {
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`• ${cert}`, 25, yPos);
    yPos += 6;
  });

  // Save the PDF
  doc.save('Promason_Poudel_CV.pdf');
};
