pipeline {
        agent {
            label "worker"
        }
        options {
            disableConcurrentBuilds()
        }
        stages {
            stage("env") {
                sh 'printenv'
            }
        }
}