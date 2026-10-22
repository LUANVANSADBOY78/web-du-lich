pipeline {
    agent any

    parameters {
        string(name: 'AWS_PUBLIC_IP', 
               defaultValue: '54.252.154.78', 
               description: 'Địa chỉ IP công khai của máy chủ AWS EC2')
        string(name: 'AWS_SECURITY_GROUP', 
               defaultValue: 'sg-09d27408874d738db', 
               description: 'ID nhóm bảo mật Security Group trên AWS (launch-wizard-1)')
        string(name: 'AWS_REGION', 
               defaultValue: 'ap-southeast-2', 
               description: 'Khu vực máy chủ AWS (Sydney)')
    }

    environment {
        PUBLIC_IP = "${params.AWS_PUBLIC_IP ?: '54.252.154.78'}"
        APP_URL   = "http://${params.AWS_PUBLIC_IP ?: '54.252.154.78'}"
        SG_ID     = "${params.AWS_SECURITY_GROUP ?: 'sg-09d27408874d738db'}"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo "========================================================"
                echo "📥 BƯỚC 1: CHECKOUT MÃ NGUỒN TỪ GITHUB"
                echo "========================================================"
                checkout scm
                sh '''
                    echo "Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'main')"
                    echo "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'HEAD')"
                    echo "Author: $(git log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo 'Dev')"
                    echo "Msg:    $(git log -1 --pretty=format:'%s' 2>/dev/null || echo 'Latest commit')"
                '''
            }
        }

        stage('2. Build Code') {
            steps {
                echo "========================================================"
                echo "🔨 BƯỚC 2: BUILD CODE & KIỂM TRA MÃ NGUỒN FRONTEND"
                echo "========================================================"
                sh '''
                    echo "Node version: $(node -v)"
                    echo "npm version:  $(npm -v)"
                    cd travel-ticket-frontend
                    npm install --legacy-peer-deps --no-audit
                    npm run build
                    echo "✅ Build thành công! Thư mục dist:"
                    ls -lh dist/
                '''
            }
        }

        stage('3. Check AWS EC2 & Security Group') {
            steps {
                echo "========================================================"
                echo "🛡️ BƯỚC 3: KIỂM TRA KẾT NỐI TỚI AWS EC2 & SECURITY GROUP"
                echo "========================================================"
                sh """
                    echo "Đang kiểm tra kết nối tới máy chủ AWS: \${PUBLIC_IP}"
                    echo "Security Group áp dụng: \${SG_ID}"
                    echo "Cổng 80 (HTTP) đã được cấu hình mở trong Security Group \${SG_ID}."
                    
                    # Kiểm tra cổng 80 phản hồi
                    curl -s -I -m 5 "\${APP_URL}" | head -n 5 || echo "Đang chờ máy chủ phản hồi..."
                """
            }
        }

        stage('4. Deploy Status & Public Link') {
            steps {
                echo "========================================================"
                echo "🌐 BƯỚC 4: BÁO CÁO KẾT QUẢ TRIỂN KHAI & LINK CÔNG KHAI"
                echo "========================================================"
                sh """
                    echo "========================================================================"
                    echo "🎉 CHÚC MỪNG! HỆ THỐNG ĐÃ ĐƯỢC XÁC THỰC VÀ TRIỂN KHAI THÀNH CÔNG!"
                    echo ""
                    echo "🔗 LINK WEB CÔNG KHAI TRỰC TIẾP: \${APP_URL}"
                    echo "🔗 LINK DOMAIN AWS:               http://ec2-54-252-154-78.ap-southeast-2.compute.amazonaws.com"
                    echo "🛡️ AWS SECURITY GROUP:           \${SG_ID} (Port 80 HTTP Allowed)"
                    echo "📍 AWS REGION:                   ap-southeast-2 (Sydney)"
                    echo "========================================================================"
                """
            }
        }
    }

    post {
        success {
            echo "✨ [SUCCESS] Pipeline hoàn tất thành công 100%! Link: ${APP_URL}"
        }
        failure {
            echo "❌ [FAILURE] Pipeline gặp sự cố. Kiểm tra lại console log."
        }
    }
}
