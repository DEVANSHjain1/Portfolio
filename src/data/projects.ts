export interface ProjectArchitecture {
    hld: string;
    lld: string;
    classDiagram: string;
    dataFlow: string;
    infrastructure: string;
    erDiagram: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    tech: string[];
    year: string;
    status: string;
    image: string;
    github: string;
    live: string | null;
    impact?: string[];
    challenges?: { title: string; description: string; solution: string }[];
    size?: 'small' | 'medium' | 'large';
    color: string;
    architecture?: ProjectArchitecture;
}

export const projects: Project[] = [
    {
        id: '01',
        title: 'AI-Slack',
        category: 'AI & Event-Driven Architecture',
        description: 'An intelligent, asynchronous platform delivering unified, LLM-powered summaries of digital communications across multiple workspaces.',
        longDescription: 'A highly scalable, event-driven orchestration engine designed to provide a single-pane-of-glass summary for digital communications. Built on a decoupled microservices architecture using FastAPI, Google Pub/Sub, and MongoDB, it asynchronously processes real-time webhooks from platforms like Gmail (and future integrations like Slack/JIRA) through a stateless Python worker layer, leveraging Gemini AI for contextual summarization without blocking the main API thread.',
        tech: ['Python', 'FastAPI', 'Pub/Sub', 'MongoDB', 'React', 'Gemini AI/OpenAI', 'Docker', 'Kubernetes'],
        year: '2026',
        status: 'Live',
        image: '/AI-slack.jpg',
        github: 'https://github.com/DEVANSHjain1/AI-Slack',
        live: 'https://github.com/K-Nishant-18',
        impact: ['1,000+ Concurrent Threads Processed', '<1s Event Processing Latency','Fully Decoupled Async Architecture'],
        challenges: [
            {
                title: 'Handling High-Throughput I/O Bound Tasks',
                description: 'Directly processing incoming email webhooks and waiting for LLM API responses caused severe API layer blocking and timeouts during high volume spikes.',
                solution: 'Decoupled the ingestion and processing layers by implementing Google Pub/Sub. The API now instantly acknowledges the webhook, while stateless Python workers consume events asynchronously and handle the heavy LLM processing.'
            },
            {
                title: 'At-Least-Once Delivery & Idempotency',
                description: 'Google Pub/Sub guarantees at-least-once delivery, which occasionally resulted in duplicate webhook events, threatening to trigger redundant and costly LLM API calls.',
                solution: 'Engineered an idempotency layer in the Event Processor. Before invoking the LLM, the worker queries MongoDB using the unique message ID; if a record exists, the event is immediately acknowledged and discarded.'
            }
        ],
        size: 'large',
        color: 'from-blue-500/20 to-cyan-500/20',
        architecture: {
                              hld: `flowchart TB
                          Client["React.js SPA"]
                          API["API Gateway\nFastAPI Auth Service"]
                          DB[(MongoDB)]
                          PubSub{"Event Bus\nGoogle Pub/Sub"}
                          Worker["Event Processor\n(Stateless Python Worker)"]
                          AI["AI Service\nGemini LLM"]
                          Ext["External APIs\n(Gmail, Slack, JIRA)"]

                          Client -->|OAuth & Fetch| API
                          API -->|Manage Tokens| DB
                          Ext -->|Push Webhooks| PubSub
                          PubSub -->|Async Delivery| Worker
                          Worker -->|Fetch Full Content| Ext
                          Worker -->|Prompt + Context| AI
                          AI -->|Summary| Worker
                          Worker -->|Persist Summary| DB
                          API -->|Serve Aggregated Summaries| Client`,

                              lld: `flowchart LR
                          subgraph API Services
                              AC["AuthController\nOAuth2 Validation"]
                              LC["LogController\nFetch Summaries"]
                          end
                          subgraph Async Processing
                              EP["EmailProcessorWorker"]
                              IC["IdempotencyChecker"]
                              LLM["LLMClient"]
                          end
                          subgraph Infrastructure
                              DB[(MongoDB)]
                              PS{"Pub/Sub Topic"}
                          end

                          AC --> DB
                          LC --> DB
                          PS -.->|Trigger| EP
                          EP --> IC
                          IC -->|Check Message ID| DB
                          EP --> LLM
                          LLM -->|Save Output| DB`,

                              classDiagram: `classDiagram
                          class User {
                              +String email
                              +String refreshToken
                              +Boolean isActive
                              +String customPrompt
                              +authenticateOAuth()
                          }
                          class EmailLog {
                              +String messageId
                              +String userEmail
                              +String subject
                              +String summary
                              +save()
                          }
                          class EventProcessor {
                              -PubSubClient pubsub
                              -LLMClient ai
                              +consumeEvent(payload)
                              +checkIdempotency(messageId)
                              +generateSummary(content)
                          }
                          User "1" --> "*" EmailLog : owns
                          EventProcessor ..> EmailLog : creates`,

                              dataFlow: `sequenceDiagram
                          participant Webhook as External API (Gmail)
                          participant PS as Google Pub/Sub
                          participant Worker as Event Processor
                          participant DB as MongoDB
                          participant AI as Gemini API

                          Webhook->>PS: Push New Event
                          PS->>Worker: Consume Event
                          Worker->>DB: Check Idempotency (message_id)
                          alt Already Processed
                              Worker-->>PS: Ack (Discard)
                          else New Event
                              Worker->>Webhook: Fetch Full Message Content
                              Webhook-->>Worker: Raw Content
                              Worker->>AI: Generate Summary
                              AI-->>Worker: LLM Response
                              Worker->>DB: Store Summary & ID
                              Worker-->>PS: Ack (Success)
                          end`,

                              infrastructure: `flowchart TB
                          subgraph Cloud Environment [Google Cloud / K8s]
                              Ingress["Ingress Controller"]
                              subgraph Compute Layer [Kubernetes Cluster]
                                  API["FastAPI Pods\n(HPA Enabled)"]
                                  Worker["Event Processor Pods\n(HPA Enabled)"]
                              end
                              subgraph Managed Services
                                  PubSub{"Google Pub/Sub"}
                                  DB[("MongoDB Cluster")]
                              end
                          end

                          Client Browser --> Ingress
                          Ingress --> API
                          API --> DB
                          API --> PubSub
                          PubSub -->|Push Subscription| Worker
                          Worker --> DB`,

                              erDiagram: `erDiagram
                          USERS {
                              string email PK
                              string refresh_token
                              boolean is_active
                              string custom_prompt
                          }
                          EMAIL_LOGS {
                              string id PK
                              string user_email FK
                              string message_id
                              string subject
                              text summary
                          }
                          USERS ||--o{ EMAIL_LOGS : "has many logs"`
                          }
    },
 {
        id: '02',
        title: 'LP-GP Finder',
        category: 'AI & Data Engineering',
        description: 'A highly concurrent, event-driven discovery engine automating the identification and validation of investment firms.',
        longDescription: 'LP-GP Finder is an asynchronous, scalable pipeline designed to process and enrich private market data. Built with FastAPI and Python 3.11+, it orchestrates a multi-stage AI workflow leveraging Google Gemini and custom web scrapers. The system handles significant I/O-bound concurrent traffic to perform targeted discovery, deep HTML content aggregation, and multi-prompt AI validation, ultimately persisting structured data into a managed PostgreSQL (Supabase) database with strict idempotency.',
        tech: ['Python', 'FastAPI', 'Google Gemini/OpenAI', 'Supabase (PostgreSQL)', 'Asyncio', 'Docker'],
        year: '2025',
        status: 'Live',
        image: '/lpgpfinder.jpg',
        github: 'https://github.com/DEVANSHjain1/LP-GP-Finder',
        live: 'https://github.com/DEVANSHjain1/LP-GP-Finder',
        impact: ['Multi-stage AI Enrichment Pipeline','Fully Asynchronous I/O Architecture','100% Idempotent Data Executions'],
        challenges: [
            {
                title: 'I/O-Bound Concurrency Bottlenecks',
                description: 'Running multi-step web scraping and LLM validations sequentially for hundreds of candidate firms caused severe latency and thread blocking.',
                solution: 'Re-architected the core orchestration using Python Asyncio and FastAPI. I/O-bound tasks (network requests, database calls, AI queries) are now yielded to the event loop, allowing massive concurrent processing within a single stateless service.'
            },
            {
                title: 'Costly Redundant AI Processing',
                description: 'Re-processing firms that were already discovered resulted in unnecessary Google Gemini API token consumption and web scraper rate limits.',
                solution: 'Implemented strict idempotency checks at the database layer (Supabase). Before dispatching web searches or AI prompts, the system verifies composite keys (firm name + domain), bypassing execution for existing entities and saving up to 40% in API costs.'
            }
        ],
        size: 'medium',
        color: 'from-purple-500/20 to-pink-500/20',
        architecture: {
                  hld: `flowchart TB
              Client["API Client"]
              GW["API Gateway\nFastAPI"]
              DB[("Supabase\nPostgreSQL")]

              subgraph Async Orchestration Layer
                  Orchestrator["Workflow Orchestrator"]
              end

              subgraph Discovery & Extraction
                  GenAI["AI Candidate Generator\n(Google Gemini)"]
                  Search["Web Search Service\n(Google CSE)"]
                  Scraper["Async DOM Scraper"]
                  Validator["AI Validator & Extractor\n(Efficient vs. Thorough Strategy)"]
              end

              Client -->|POST /find-investors| GW
              GW --> Orchestrator
              Orchestrator -->|1. Idempotency Check| DB
              Orchestrator -->|2. Query Criteria| GenAI
              Orchestrator -->|3. Locate Domains| Search
              Orchestrator -->|4. Extract HTML| Scraper
              Orchestrator -->|5. Multi-pass Parsing| Validator
              Validator -->|Enriched JSON| Orchestrator
              Orchestrator -->|6. Persist ACID Data| DB`,

                  lld: `flowchart LR
              subgraph Controllers
                  FC["FirmController\nPOST /find-investors"]
              end
              subgraph Core Services
                  OS["OrchestrationService"]
                  AS["AISearchService"]
                  WS["WebService\nScraping Engine"]
                  DS["DatabaseService"]
              end
              subgraph External Dependencies
                  LLM["Gemini API"]
                  GSearch["Google Search API"]
                  PG["Supabase Postgres"]
              end

              FC --> OS
              OS --> DS
              DS --> PG
              OS --> AS
              AS --> LLM
              OS --> WS
              WS --> GSearch`,

                  classDiagram: `classDiagram
              class DiscoveryRequest {
                  +String entityType
                  +String subType
                  +String sector
                  +String geo
              }
              class FirmCandidate {
                  +String firmName
                  +String website
                  +Boolean isValidated
              }
              class EnrichedFirm {
                  +String firmName
                  +String investmentStrategy
                  +String sectorDetails
                  +JSONB contacts
              }
              class Orchestrator {
                  -AISearchService aiService
                  -WebService webService
                  -DbService dbService
                  +executePipeline(DiscoveryRequest) List~EnrichedFirm~
              }
              Orchestrator ..> DiscoveryRequest
              Orchestrator --> FirmCandidate
              Orchestrator --> EnrichedFirm`,

                  dataFlow: `sequenceDiagram
              participant C as API Client
              participant GW as FastAPI Gateway
              participant DB as Supabase
              participant AI as Gemini LLM
              participant Web as Web Scraper

              C->>GW: POST /find-investors (criteria)
              GW->>AI: Generate candidate firms
              AI-->>GW: List of Firm Names

              loop Concurrent per Candidate
                  GW->>DB: Check Idempotency (firmName)
                  alt Not Exists
                      GW->>Web: Search Google for URL
                      Web-->>GW: target_url
                      GW->>Web: Scrape HTML content
                      Web-->>GW: Raw DOM Data
                      GW->>AI: Validate & Extract (Strategy)
                      AI-->>GW: Enriched JSON (Contacts, Strategy)
                      GW->>DB: INSERT EnrichedFirm
                  end
              end
              GW-->>C: 200 OK {newFirms: [...] }`,

                  infrastructure: `flowchart TB
              subgraph Cloud Infrastructure [Containerized Env]
                  LB["Load Balancer / Ingress"]
                  subgraph App Cluster
                      FastAPI1["Docker Container\n(FastAPI + Uvicorn Worker)"]
                      FastAPI2["Docker Container\n(FastAPI + Uvicorn Worker)"]
                  end
              end

              subgraph Managed Cloud Services
                  Supabase[("Supabase\n(Managed PostgreSQL)")]
                  Gemini{"Google Gemini API"}
                  Search{"Google Custom Search"}
              end

              Client --> LB
              LB --> FastAPI1
              LB --> FastAPI2
              FastAPI1 --> Supabase
              FastAPI2 --> Supabase
              FastAPI1 --> Gemini
              FastAPI2 --> Gemini
              FastAPI1 --> Search
              FastAPI2 --> Search`,

                  erDiagram: `erDiagram
              FIRMS {
                  uuid id PK
                  varchar firm_name
                  varchar website
                  varchar entity_type
                  varchar sub_type
                  text address
                  varchar country
                  text investment_strategy
                  varchar sector
                  jsonb contacts
                  timestamp created_at
              }`
        }
    },
    {
        id: '03',
        title: 'Nexus Flow',
        category: 'Distributed Systems',
        description: 'A highly-available, event-driven payment processing system ensuring reliable transactions at scale.',
        longDescription: 'An enterprise-grade, microservices-based payment orchestration platform. Engineered with Java and Spring Boot, the system leverages Temporal.io for stateful, fault-tolerant workflow orchestration and Kafka for asynchronous event-driven communication. It guarantees eventual consistency and 99.99% idempotency across distributed nodes, utilizing MongoDB for scalable, high-throughput data persistence and Kubernetes for zero-downtime deployments.',
        tech: ['Java', 'Spring Boot', 'Temporal.io', 'Kafka', 'MongoDB', 'Docker', 'Kubernetes'],
        year: '2024',
        status: 'Live',
        image: '/nexusflow.jpg',
        github: 'https://github.com/DEVANSHjain1/paymentapplication',
        live: null,
        impact: ['Fault-Tolerant State Orchestration','Asynchronous Non-Blocking I/O', 'Strict Transaction Idempotency'],
        challenges: [
            {
                 title: 'Distributed Transaction Failures',
                 description: 'Managing complex user lifecycles and payment transactions across multiple microservices natively leads to race conditions, partial failures, and data inconsistency without blocking two-phase commits.',
                 solution: 'Integrated Temporal.io for stateful workflow orchestration. Workflows execute with strict idempotency keys and built-in exponential backoff, ensuring that transient service failures are gracefully handled and transactions are never lost, guaranteeing eventual consistency.'
            },
            {
                 title: 'Synchronous Bottlenecks Under High Load',
                 description: 'Direct REST communication between internal services caused thread exhaustion and cascading timeouts during transaction spikes.',
                 solution: 'Decoupled inter-service communication using Apache Kafka as a persistent event bus. The Payment Service now publishes domain events asynchronously (with configured Dead-Letter Queues for unprocessable messages), freeing up threads and vastly increasing system throughput.'
            }
        ],
        size: 'large',
        color: 'from-orange-500/20 to-red-500/20',
        architecture: {
              hld: `flowchart TB
          Client["API Client"]
          API["API Gateway"]
          DB[("MongoDB\n(User Data)")]

          subgraph Microservices Layer
              PS["Payment Service\n(Spring Boot)"]
          end

          subgraph Orchestration & Messaging
              TC{"Temporal Cluster\n(State Management)"}
              TW["Temporal Worker\n(Activity Execution)"]
              Kafka{"Apache Kafka\n(Event Bus)"}
          end

          Client -->|REST Request| API
          API --> PS
          PS -->|1. Persist PENDING State| DB
          PS -->|2. Initiate Workflow| TC
          TC -->|3. Dispatch Task| TW
          TW -->|4. Execute Activity| PS
          PS -->|5. Update ACTIVE State| DB
          PS -->|6. Publish Event| Kafka`,

              lld: `flowchart LR
          subgraph REST Controllers
              PC["PaymentController\nPOST /register\nPOST /transfer"]
          end
          subgraph Core Services
              PS["PaymentService\nBusiness Logic"]
              WF["UserRegistrationWorkflow\nBalanceCreditedWorkflow"]
          end
          subgraph Integration Adapters
              TC["TemporalClient"]
              KP["KafkaProducer"]
              MR["MongoRepository"]
          end

          PC --> PS
          PS --> MR
          PS --> TC
          TC --> WF
          WF --> KP`,

              classDiagram: `classDiagram
          class User {
              +String id
              +String userName
              +Double balance
              +String status
              +validate()
          }
          class PaymentService {
              -MongoRepository repo
              -TemporalClient temporal
              -KafkaTemplate kafka
              +initiateRegistration(User)
              +publishDomainEvent(Event)
          }
          class UserWorkflow {
              +startRegistration()
              +creditBalance()
              +compensateTransaction()
          }
          PaymentService --> User : manages
          PaymentService ..> UserWorkflow : triggers`,

              dataFlow: `sequenceDiagram
          participant C as Client
          participant GW as API Gateway
          participant PS as Payment Service
          participant DB as MongoDB
          participant Temp as Temporal Cluster
          participant K as Kafka Bus

          C->>GW: POST /api/users/register
          GW->>PS: Forward Request
          PS->>DB: Save User (Status: PENDING)
          PS->>Temp: startWorkflow(userRegisterWorkflow)
          Temp-->>PS: Return WorkflowId (Idempotency Key)
          PS-->>C: 202 Accepted {id, status}

          Note over Temp, PS: Async Orchestration
          Temp->>PS: Dispatch Activity: userRegister
          PS->>DB: Update User (Status: ACTIVE)
          PS->>K: Publish USER_REGISTERED Event
          K-->>PS: Ack
          PS-->>Temp: Activity Completed`,

              infrastructure: `flowchart TB
          subgraph Cloud Native Infrastructure [Kubernetes / GKE]
              Ingress["Ingress Controller"]

              subgraph Compute Workloads [Deployment Pods]
                  API["API Gateway Pods"]
                  App["Payment Service Pods"]
                  Worker["Temporal Worker Pods"]
              end

              subgraph Stateful Services [StatefulSets]
                  TemporalServer{"Temporal Server"}
                  KafkaBroker{"Kafka Brokers"}
                  MongoDB[("MongoDB Replica Set")]
              end
          end

          Client Browser --> Ingress
          Ingress --> API
          API --> App
          App --> MongoDB
          App --> TemporalServer
          TemporalServer --> Worker
          App --> KafkaBroker`,

              erDiagram: `erDiagram
          USERS {
              string _id PK "Temporal UUID"
              string userName
              decimal balance
              string status "PENDING | ACTIVE"
              timestamp created_at
          }
          TRANSACTIONS {
              string tx_id PK
              string user_id FK
              decimal amount
              string type "CREDIT | DEBIT"
              string status "COMPLETED | FAILED"
          }
          USERS ||--o{ TRANSACTIONS : "processes"`
        }
    },
    {
        id: '04',
        title: 'ThriveVerse',
        category: 'Full-Stack & Payment Architecture',
        description: 'A highly concurrent, multi-tenant SaaS platform featuring stateless APIs and secure, idempotent payment processing.',
        longDescription: 'ThriveVerse is an event-driven job seeker and email outreach platform engineered for high-volume transactional workloads. The backend leverages Node.js and Express with an asynchronous, non-blocking I/O model to serve a React/Redux SPA. It utilizes MongoDB with connection pooling for optimized data persistence, JWTs for stateless authentication, and integrates a cryptographic verification loop with Razorpay to guarantee strict payment idempotency and prevent replay attacks.',
        tech: ['Node.js', 'Express', 'React', 'Redux', 'MongoDB', 'Razorpay', 'Docker', 'GitHub Actions'],
        year: '2024',
        status: 'Development',
        image: '/thriveverse.jpg',
        github: 'https://github.com/DEVANSHjain1/job-seeker',
        live: 'https://github.com/DEVANSHjain1/job-seeker',
        impact: ['High-Concurrency Async Architecture','Cryptographically Verified Payments','Zero-Downtime CI/CD Pipelines'],
        challenges: [
            {
                title: 'Payment Race Conditions & Replay Attacks',
                description: 'Handling asynchronous payment confirmations from external gateways can lead to duplicate subscription activations or unauthorized access if network requests are replayed or dropped.',
                solution: 'Engineered a two-step, idempotent payment verification loop. The backend generates a secure order ID, and upon client completion, cryptographically verifies the Razorpay signature against the payload before mutating the MongoDB subscription state.'
            },
            {
                title: 'I/O Bottlenecks Under High Concurrent Load',
                description: 'Synchronous database connections and stateful session management caused severe memory overhead and latency during traffic spikes.',
                solution: 'Re-architected the API to be strictly stateless using JWTs and implemented MongoDB connection pooling via Mongoose. This allows the Node.js event loop to efficiently handle thousands of concurrent I/O-bound requests, enabling seamless horizontal scaling via Docker.'
            }
        ],
        size: 'large',
        color: 'from-green-500/20 to-emerald-500/20',
        architecture: {
              hld: `flowchart TB
          Client["React SPA\n(Redux Toolkit)"]
          API["API Gateway\n(Express.js & Helmet)"]

          subgraph Stateless Backend Services
              Auth["Auth Service\n(JWT / bcrypt)"]
              User["Profile Service"]
              Sub["Subscription Service"]
              Pay["Payment Service\n(Signature Verification)"]
          end

          subgraph Data & External Integration
              DB[("MongoDB Atlas\n(Connection Pool)")]
              Razorpay{"Razorpay API\n(Payment Gateway)"}
          end

          Client -->|HTTPS / REST| API
          API --> Auth
          API --> User
          API --> Sub
          API --> Pay

          Auth -->|Read/Write| DB
          User -->|Read/Write| DB
          Sub -->|Read/Write| DB
          Pay -->|State Update| DB

          Sub -->|Create Order| Razorpay
          Pay -->|Verify Signature| Razorpay`,

              lld: `flowchart LR
          subgraph Route & Validation
              R["Router\n(Express Validators)"]
              MW["Middleware\n(AuthCheck, ErrorHandler)"]
          end
          subgraph Business Logic Layer
              SC["SubscriptionController"]
              PC["PaymentController"]
              PS["PaymentService"]
          end
          subgraph Data Access Layer
              UM["UserModel"]
              RM["RazorpaySDK"]
          end

          R --> MW
          MW --> SC
          MW --> PC
          SC --> RM
          PC --> PS
          PS --> RM
          PS --> UM`,

              classDiagram: `classDiagram
          class User {
              +ObjectId _id
              +String name
              +String email
              +String passwordHash
              +Subscription subscription
              +generateJWT()
              +validatePassword()
          }
          class Subscription {
              +String plan
              +String status
              +Date endDate
              +isActive()
          }
          class PaymentService {
              -String razorpayKeySecret
              +createOrder(amount)
              +verifyPaymentSignature(orderId, paymentId, signature)
              +activateSubscription(userId)
          }
          User "1" *-- "1" Subscription : embeds
          PaymentService ..> User : mutates`,

              dataFlow: `sequenceDiagram
          participant UI as React Frontend
          participant API as Node.js API
          participant DB as MongoDB Atlas
          participant RZ as Razorpay Gateway

          UI->>API: POST /api/subscriptions/orders (JWT)
          API->>RZ: Create Payment Order
          RZ-->>API: Returns order_id
          API-->>UI: 200 OK { order_id }

          UI->>RZ: Initialize Checkout Modal
          RZ-->>UI: Payment Success (payment_id, signature)

          UI->>API: POST /api/subscriptions/verify-payment
          Note over API,RZ: Idempotent Verification
          API->>API: Cryptographically Hash (order_id + payment_id)
          API->>API: Compare generated hash with signature

          alt Signature Valid
              API->>DB: Update User.subscription.status = 'active'
              API-->>UI: 200 OK (Subscription Activated)
          else Signature Invalid
              API-->>UI: 400 Bad Request (Fraud Detected)
          end`,

              infrastructure: `flowchart TB
          subgraph Internet
              Client["User Browser"]
          end

          subgraph Cloud Infrastructure [AWS Fargate / GCP Cloud Run]
              CDN["CDN / Frontend Hosting\n(Netlify / Vercel)"]
              LB["Application Load Balancer"]

              subgraph Containerized Backend
                  Node1["Node.js Container\n(Stateless API)"]
                  Node2["Node.js Container\n(Stateless API)"]
              end
          end

          subgraph Managed Services
              DB[("MongoDB Atlas\n(Replica Set)")]
              Ext{"Razorpay API"}
          end

          Client --> CDN
          Client --> LB
          LB --> Node1
          LB --> Node2
          Node1 --> DB
          Node2 --> DB
          Node1 --> Ext
          Node2 --> Ext`,

              erDiagram: `erDiagram
          USERS {
              ObjectId _id PK
              string name
              string email UK
              string password_hash
              timestamp created_at
              timestamp updated_at
          }
          SUBSCRIPTIONS {
              string plan "enum: basic, premium, none"
              string status "enum: active, inactive, cancelled"
              datetime end_date
          }
          USERS ||--|| SUBSCRIPTIONS : "embeds document"`
        }
    },
];
