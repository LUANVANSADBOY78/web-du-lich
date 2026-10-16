pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "gotravel-backend"
        FRONTEND_IMAGE = "gotravel-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "Checking out branch: ${env.BRANCH_NAME ?: 'main'}"
                    echo "Commit SHA: ${env.GIT_COMMIT}"
                }
            }
        }

        stage('Docker Build') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "docker build -t docker.io/$DOCKER_USER/$BACKEND_IMAGE:latest ./GoTravel.API"
                    sh "docker build -t docker.io/$DOCKER_USER/$FRONTEND_IMAGE:latest ./travel-ticket-frontend"
                }
            }
        }

        stage('Push Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push docker.io/\$DOCKER_USER/\$BACKEND_IMAGE:latest"
                    sh "docker push docker.io/\$DOCKER_USER/\$FRONTEND_IMAGE:latest"
                }
            }
        }

        stage('Deploy Server') {
            steps {
                script {
                    sh '''
                    # Khoi dong ung dung bang Docker Compose
                    docker compose -f docker-compose.prod.yml down || true
                    docker compose -f docker-compose.prod.yml pull || true
                    docker compose -f docker-compose.prod.yml up -d
                    docker image prune -f
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sleep time: 10, unit: 'SECONDS'
                    sh 'docker compose -f docker-compose.prod.yml ps'
                }
            }
        }
    }

    post {
        success {
            echo "SUCCESS: CI/CD Pipeline executed successfully! App is running on port 80 and 5106."
        }
        failure {
            echo "FAILURE: Pipeline failed. Check logs above."
        }
    }
}
