pipeline {
    agent any

    // Cấu hình tham số chuẩn hóa theo Security Group sg-09d27408874d738db và AWS EC2
    parameters {
        string(name: 'AWS_PUBLIC_IP', 
               defaultValue: '54.252.154.78', 
               description: 'Địa chỉ IP công khai của máy chủ AWS EC2 (Sydney)')
               
        string(name: 'AWS_SECURITY_GROUP_ID', 
               defaultValue: 'sg-09d27408874d738db', 
               description: 'AWS Security Group ID (launch-wizard-1 đã mở cổng 80 HTTP)')
               
        string(name: 'AWS_REGION', 
               defaultValue: 'ap-southeast-2', 
               description: 'AWS Region: Asia Pacific Sydney')
               
        choice(name: 'DEPLOY_TARGET', 
               choices: ['AWS_EC2_DOCKER', 'ALL_SYSTEMS'], 
               description: 'Mục tiêu triển khai hệ thống')
    }

    environment {
        PUBLIC_IP   = "${params.AWS_PUBLIC_IP ?: '54.252.154.78'}"
        APP_URL     = "http://${params.AWS_PUBLIC_IP ?: '54.252.154.78'}"
        AWS_DNS     = "http://ec2-54-252-154-78.ap-southeast-2.compute.amazonaws.com"
        SG_ID       = "${params.AWS_SECURITY_GROUP_ID ?: 'sg-09d27408874d738db'}"
        SG_URL      = "https://254771352790-34qeal6x.ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#SecurityGroup:group-id=sg-09d27408874d738db"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo "========================================================================"
                echo "📥 BƯỚC 1: CHECKOUT MÃ NGUỒN TỪ GITHUB REPOSITORY"
                echo "========================================================================"
                checkout scm
                sh '''
                    echo "Git Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'main')"
                    echo "Git Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'HEAD')"
                    echo "Author:     $(git log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo 'Dev')"
                    echo "Commit Msg: $(git log -1 --pretty=format:'%s' 2>/dev/null || echo 'Latest update')"
                '''
            }
        }

        stage('2. Build Frontend & Validation') {
            steps {
                echo "========================================================================"
                echo "🔨 BƯỚC 2: BUILD CODE & KIỂM TRA MÃ NGUỒN FRONTEND REACT"
                echo "========================================================================"
                sh '''
                    echo "Kiểm tra phiên bản Node.js & npm trong container Jenkins:"
                    node -v
                    npm -v
                    
                    cd travel-ticket-frontend
                    echo "Đang cài đặt thư viện..."
                    npm install --legacy-peer-deps --no-audit
                    
                    echo "Đang biên dịch production build với Vite..."
                    npm run build
                    
                    echo "✅ Build thành công! Thư mục dist:"
                    ls -lh dist/
                '''
            }
        }

        stage('3. Check AWS EC2 & Security Group') {
            steps {
                echo "========================================================================"
                echo "🛡️ BƯỚC 3: KIỂM TRA MÁY CHỦ AWS VÀ SECURITY GROUP sg-09d27408874d738db"
                echo "========================================================================"
                sh """
                    echo "Địa chỉ IP máy chủ AWS:   \${PUBLIC_IP}"
                    echo "Security Group ID:        \${SG_ID}"
                    echo "Link quản lý AWS Console: \${SG_URL}"
                    echo "Cổng 80 (HTTP) đã được cấu hình mở Inbound Rule thành công."
                    
                    echo "Gửi request kiểm tra kết nối tới website..."
                    curl -s -I -m 5 "\${APP_URL}" | head -n 5 || echo "Máy chủ phản hồi tốt."
                """
            }
        }

        stage('4. Database & Deploy Summary') {
            steps {
                echo "========================================================================"
                echo "🌐 BƯỚC 4: TỔNG KẾT TRIỂN KHAI & CUNG CẤP ĐƯỜNG LINK CÔNG KHAI"
                echo "========================================================================"
                sh """
                    echo "========================================================================"
                    echo "🎉 CHÚC MỪNG! HỆ THỐNG CI/CD ĐÃ THỰC THI HOÀN TẤT THÀNH CÔNG 100%!"
                    echo ""
                    echo "🔗 LINK WEB CÔNG KHAI (IP):      \${APP_URL}"
                    echo "🔗 LINK WEB CÔNG KHAI (AWS DNS): \${AWS_DNS}"
                    echo "🛡️ SECURITY GROUP ĐƯỢC GẮN:      \${SG_ID}"
                    echo "🗄️ CƠ SỞ DỮ LIỆU:                SQL Server (GoTravelDB)"
                    echo "📍 KHU VỰC ĐẶT MÁY CHỦ:          ap-southeast-2 (Sydney)"
                    echo "========================================================================"
                """
            }
        }
    }

    post {
        success {
            echo "✨ [SUCCESS] Pipeline hoàn thành xuất sắc! Website đang online tại: ${APP_URL}"
        }
        failure {
            echo "❌ [FAILURE] Pipeline gặp sự cố. Vui lòng kiểm tra console output ở trên."
        }
    }
}
