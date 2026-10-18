export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#1e2a1e] to-[#1a1a2e]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="pixel-font text-xl sm:text-2xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
            📜 Player Stats
          </h2>
          <div className="w-32 h-1 bg-[#FCDB05] mx-auto" />
        </div>

        {/* About Content - Book style */}
        <div className="mc-panel max-w-4xl mx-auto">
          {/* Book header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#5A5A5A]">
            <div className="w-10 h-10 bg-[#8B6914] border-2 border-[#6B4F12] flex items-center justify-center">
              <span className="text-xl">📖</span>
            </div>
            <div>
              <h3 className="pixel-font text-xs text-[#FCDB05]">Professional Summary</h3>
              <p className="text-gray-400 text-sm">Class: Senior Data Engineer</p>
            </div>
          </div>

          {/* Summary text */}
          <div className="space-y-4 text-lg leading-relaxed text-gray-200">
            <p>
              <span className="text-[#4AEDD9]">⚡</span> Accomplished and versatile <span className="text-[#FCDB05]">Senior Data Engineer</span> with <span className="text-[#17DD62]">6+ years</span> of experience architecting scalable, secure, and high-performance data platforms across <span className="text-[#4AEDD9]">healthcare, finance, insurance, and retail</span> domains.
            </p>
            <p>
              <span className="text-[#4AEDD9]">⚡</span> Strong expertise in designing modern <span className="text-[#FCDB05]">cloud-native Lakehouse Architecture</span>, enterprise Data Warehouses, and analytics platforms using <span className="text-[#17DD62]">Azure Data Factory, Azure Databricks, Snowflake, Delta Lake, AWS Glue, Amazon S3, Amazon Redshift, GCP BigQuery</span>, and more.
            </p>
            <p>
              <span className="text-[#4AEDD9]">⚡</span> Skilled in building <span className="text-[#FCDB05]">metadata-driven ETL/ELT Frameworks</span>, batch and real-time streaming pipelines, Data Integration solutions, and optimized Data Models that improve scalability, governance, Data Quality, Data Lineage, and regulatory compliance aligned with <span className="text-[#17DD62]">HIPAA, GDPR</span>, and enterprise security standards.
            </p>
            <p>
              <span className="text-[#4AEDD9]">⚡</span> Experienced in developing <span className="text-[#FCDB05]">AI-ready data platforms</span> and supporting <span className="text-[#4AEDD9]">Generative AI and RAG Pipeline</span> use cases by preparing curated, governed, and analytics-ready datasets for Machine Learning, Vector Search, Semantic Retrieval, advanced analytics, and executive reporting.
            </p>
            <p>
              <span className="text-[#4AEDD9]">⚡</span> Proficient in <span className="text-[#17DD62]">Python, SQL, PySpark, Apache Spark, Kafka, Airflow, dbt, Terraform, Git, Azure DevOps, CI/CD Automation</span>, and cloud-native monitoring tools to deliver reliable production-grade data solutions.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-[#5A5A5A]">
            <div className="text-center">
              <div className="pixel-font text-xl text-[#FCDB05]">6+</div>
              <div className="text-sm text-gray-400">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="pixel-font text-xl text-[#4AEDD9]">3</div>
              <div className="text-sm text-gray-400">Clouds</div>
            </div>
            <div className="text-center">
              <div className="pixel-font text-xl text-[#17DD62]">4</div>
              <div className="text-sm text-gray-400">Domains</div>
            </div>
            <div className="text-center">
              <div className="pixel-font text-xl text-[#B02E26]">120M+</div>
              <div className="text-sm text-gray-400">Daily Records</div>
            </div>
          </div>
        </div>

        {/* Hearts / Health bar */}
        <div className="flex justify-center gap-1 mt-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="heart text-lg">❤️</span>
          ))}
        </div>
      </div>
    </section>
  )
}
