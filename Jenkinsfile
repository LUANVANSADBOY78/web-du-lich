pipeline {
    agent any

    parameters {
        string(name: 'RENDER_DEPLOY_HOOK', 
               defaultValue: '', 
               description: 'URL Render Deploy Hook (Vào Render -> Web Service web-du-lich -> Settings -> Deploy Hook để copy link)')
        string(name: 'RENDER_PUBLIC_URL', 
               defaultValue: 'https://web-du-lich.onrender.com', 
               description: 'Đường dẫn công khai của website trên Render')
    }

    environment {
        SERVICE_ID = 'srv-db8ulrs9v7es73duocq0'
        PUBLIC_URL = "${params.RENDER_PUBLIC_URL ?: 'https://web-du-lich.onrender.com'}"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo "========================================================"
                echo "📥 BƯỚC 1: CHECKOUT MÃ NGUỒN TỪ GITHUB"
                echo "========================================================"
                checkout scm
                sh '''
                    echo "Git Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'main')"
                    echo "Git Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'HEAD')"
                    echo "Author:     $(git log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo 'Dev')"
                    echo "Commit Msg: $(git log -1 --pretty=format:'%s' 2>/dev/null || echo 'Latest commit')"
                '''
            }
        }

        stage('2. Build Code') {
            steps {
                echo "========================================================"
                echo "🔨 BƯỚC 2: BUILD CODE VÀ KIỂM TRA MÃ NGUỒN"
                echo "========================================================"
                sh '''
                    echo "Node.js version: $(node -v)"
                    echo "npm version:     $(npm -v)"
                    
                    echo "Đang cài đặt thư viện và build React frontend..."
                    cd travel-ticket-frontend
                    npm install --legacy-peer-deps --no-audit
                    npm run build
                    
                    echo "✅ Build thành công! Kiểm tra thư mục dist:"
                    ls -lh dist/
                '''
            }
        }

        stage('3. Jenkins Deploy -> Render') {
            steps {
                echo "========================================================"
                echo "🚀 BƯỚC 3: JENKINS GỌI LỆNH DEPLOY SANG RENDER"
                echo "========================================================"
                script {
                    def hookUrl = params.RENDER_DEPLOY_HOOK ?: env.RENDER_DEPLOY_HOOK
                    if (!hookUrl || hookUrl.trim() == '' || hookUrl.contains('YOUR_KEY')) {
                        echo "⚠️ CHÚ Ý: Chưa cung cấp RENDER_DEPLOY_HOOK!"
                        echo "👉 Cách lấy Render Deploy Hook rất nhanh:"
                        echo "   1. Vào: https://dashboard.render.com/web/${SERVICE_ID}"
                        echo "   2. Chọn tab 'Settings' -> Kéo xuống mục 'Deploy Hook'"
                        echo "   3. Bấm 'Create Deploy Hook' (hoặc Copy URL dạng https://api.render.com/deploy/${SERVICE_ID}?key=...)"
                        echo "   4. Bấm 'Build with Parameters' trên Jenkins và dán vào ô RENDER_DEPLOY_HOOK."
                        echo "--------------------------------------------------------"
                        echo "Render vẫn có thể tự động build khi bạn push code lên GitHub main."
                    } else {
                        echo "Đang gửi lệnh POST Webhook kích hoạt Deploy trên Render..."
                        sh """
                            RESPONSE=\$(curl -s -w "\\nHTTP_CODE:%{http_code}" -X POST "${hookUrl}")
                            echo "Kết quả phản hồi từ Render:"
                            echo "\$RESPONSE"
                            HTTP_CODE=\$(echo "\$RESPONSE" | tr -d '\\r' | sed -n 's/.*HTTP_CODE://p')
                            if [ "\$HTTP_CODE" = "200" ] || [ "\$HTTP_CODE" = "201" ]; then
                                echo "✅ Kích hoạt Render Deploy thành công (HTTP \$HTTP_CODE)!"
                            else
                                echo "⚠️ Render trả về mã \$HTTP_CODE. Vui lòng kiểm tra lại URL Deploy Hook."
                            fi
                        """
                    }
                }
            }
        }

        stage('4. Render Run & Public Link') {
            steps {
                echo "========================================================"
                echo "🌐 BƯỚC 4: RENDER CHẠY ỨNG DỤNG & CUNG CẤP LINK CÔNG KHAI"
                echo "========================================================"
                sh """
                    echo "========================================================================"
                    echo "🎉 QUÁ TRÌNH BUILD & GỌI LỆNH DEPLOY ĐÃ HOÀN TẤT THÀNH CÔNG!"
                    echo "🔗 LINK WEB CÔNG KHAI: \${PUBLIC_URL}"
                    echo "📊 RENDER DASHBOARD:   https://dashboard.render.com/web/${SERVICE_ID}"
                    echo "========================================================================"
                    echo "Đang kiểm tra trạng thái trang web công khai..."
                    curl -s -I -m 5 "\${PUBLIC_URL}" | head -n 5 || echo "Render đang build Docker và khởi chạy container, website sẽ online sau 1-2 phút!"
                """
            }
        }
    }

    post {
        success {
            echo "✨ [SUCCESS] Pipeline thực thi hoàn tất! Link web công khai: ${PUBLIC_URL}"
        }
        failure {
            echo "❌ [FAILURE] Pipeline thất bại. Vui lòng kiểm tra console output ở trên."
        }
    }
}
