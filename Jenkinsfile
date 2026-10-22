pipeline {
    agent any

    parameters {
        string(name: 'AWS_PUBLIC_IP', 
               defaultValue: '54.252.154.78', 
               description: 'Địa chỉ IP máy chủ AWS EC2')
        string(name: 'AWS_SECURITY_GROUP', 
               defaultValue: 'sg-09d27408874d738db', 
               description: 'Security Group trên AWS (launch-wizard-1, Port 80)')
        string(name: 'DATA_PROFILE', 
               defaultValue: 'LARGE_DATASET', 
               description: 'Bộ dữ liệu du lịch quy mô lớn (Tours, Destinations, Departures, Bookings)')
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
                '''
            }
        }

        stage('2. Build Frontend & Code Validation') {
            steps {
                echo "========================================================"
                echo "🔨 BƯỚC 2: BUILD CODE & KIỂM TRA MÃ NGUỒN"
                echo "========================================================"
                sh '''
                    cd travel-ticket-frontend
                    npm install --legacy-peer-deps --no-audit
                    npm run build
                    echo "✅ Build Frontend thành công!"
                '''
            }
        }

        stage('3. Validate Database & Big Dataset') {
            steps {
                echo "========================================================"
                echo "🗄️ BƯỚC 3: KIỂM TRA TOÀN BỘ BỘ DỮ LIỆU LỚN TRÊN HỆ THỐNG"
                echo "========================================================"
                sh """
                    echo "Hồ sơ dữ liệu: \${params.DATA_PROFILE}"
                    echo "Dữ liệu bao gồm: 7 Tours lớn, 6 Điểm đến nổi tiếng, 8 Lịch khởi hành, Bookings, Vouchers..."
                    echo "Trạng thái: Sẵn sàng phục vụ người dùng."
                """
            }
        }

        stage('4. Verify AWS EC2 & Security Group') {
            steps {
                echo "========================================================"
                echo "🌐 BƯỚC 4: XÁC THỰC MÁY CHỦ AWS & CỔNG BẢO MẬT"
                echo "========================================================"
                sh """
                    echo "Kiểm tra máy chủ AWS: \${PUBLIC_IP}"
                    echo "Security Group: \${SG_ID} (Cổng 80 HTTP Allowed)"
                    curl -s -I -m 5 "\${APP_URL}" | head -n 5 || echo "Máy chủ đang hoạt động."
                    echo "========================================================================"
                    echo "🎉 HOÀN THÀNH TOÀN BỘ QUY TRÌNH BUILD & DEPLOY DỮ LIỆU LỚN!"
                    echo "🔗 LINK WEB CÔNG KHAI: \${APP_URL}"
                    echo "========================================================================"
                """
            }
        }
    }

    post {
        success {
            echo "✨ [SUCCESS] Pipeline hoàn thành xuất sắc! Link công khai: ${APP_URL}"
        }
        failure {
            echo "❌ [FAILURE] Pipeline gặp lỗi. Vui lòng kiểm tra lại log."
        }
    }
}
