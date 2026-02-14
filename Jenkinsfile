pipeline {
    agent any   // أي node متاح في Jenkins

    environment {
        CYPRESS_BROWSER = "firefox"   // لتشغيل Cypress على Firefox
    }

    stages {
        stage('Checkout Repo') {
            steps {
                echo "Checking out Repo B branch main..."
                // Clone branch main من Repo B
                git branch: 'main', url: 'https://github.com/Ahmed-Dorgham/Cypress_Dafater_Regression.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                // على Windows نستخدم bat
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "Running Cypress tests on Firefox..."
                bat 'npx cypress run --browser firefox'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
