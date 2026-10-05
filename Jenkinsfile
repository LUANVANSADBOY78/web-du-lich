pipeline {
    agent any

    environment {
        // We will build Docker images with a BUILD_NUMBER tag
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        // Set configuration to pass into docker-compose
        COMPOSE_PROJECT_NAME = "gotravel"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "Checking out branch: ${env.BRANCH_NAME}"
                    echo "Commit SHA: ${env.GIT_COMMIT}"
                }
            }
        }

        stage('Environment Check') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Build Docker Images') {
            steps {
                // Building Frontend and Backend using standard docker-compose build
                // It uses the latest tags by default in the standard yml, but we will tag them explicitly
                sh 'docker build -t gotravel-frontend:${DOCKER_TAG} -t gotravel-frontend:latest ./travel-ticket-frontend'
                sh 'docker build -t gotravel-backend:${DOCKER_TAG} -t gotravel-backend:latest ./GoTravel.API'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'gotravel-db-password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'gotravel-jwt-secret', variable: 'JWT_SECRET'),
                    string(credentialsId: 'gotravel-ai-key', variable: 'AI_API_KEY')
                ]) {
                    // Create .env file for docker-compose to use
                    sh '''
                        echo "DB_PASSWORD=${DB_PASSWORD}" > .env
                        echo "JWT_SECRET=${JWT_SECRET}" >> .env
                        echo "AI_API_KEY=${AI_API_KEY}" >> .env
                        echo "ASPNETCORE_ENVIRONMENT=Production" >> .env
                        echo "BUILD_NUMBER=${DOCKER_TAG}" >> .env
                    '''
                    
                    // Run compose up
                    sh 'docker compose -f docker-compose.yml -f docker-compose.production.yml up -d'
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // Wait for SQL Server and Backend to stabilize
                    sleep time: 15, unit: 'SECONDS'
                    
                    // Verify backend is reachable
                    sh 'curl -f http://localhost:8080/health'
                    
                    // Verify frontend is reachable
                    sh 'curl -f http://localhost:80/'
                }
            }
        }
    }

    post {
        success {
            echo 'DEPLOY SUCCESS: GoTravel is live!'
        }
        failure {
            echo 'DEPLOY FAILED. Checking logs...'
            sh 'docker compose logs --tail=100 backend || true'
            sh 'docker compose logs --tail=100 frontend || true'
        }
        always {
            // Cleanup dangling images to free disk space (does not delete volumes)
            sh 'docker image prune -f'
            // Ensure no credentials linger in the workspace
            sh 'rm -f .env'
        }
    }
}
